"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "../components/AdminSidebar";
import { TiptapEditor } from "../components/TiptapEditor";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  ArrowLeft,
  Save,
  Globe,
  Clock,
  Loader2,
  Eye,
  Trash2,
} from "lucide-react";
import type { PostWithAuthor } from "@/lib/db/types";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface PostEditorProps {
  user: AdminUser;
  post?: PostWithAuthor;
}

export function PostEditor({ user, post }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!post;

  // Form state
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [content, setContent] = useState<Record<string, unknown> | null>(
    post?.content || null
  );

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-generate slug from title
  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Auto-generate slug if creating new post and slug hasn't been manually edited
    if (!isEditing && (!slug || slug === generateSlug(title))) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Save as draft
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const postData = {
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        excerpt: excerpt.trim() || null,
        featured_image: featuredImage.trim() || null,
        content,
        status: "draft",
      };

      let response;
      if (isEditing) {
        response = await fetch(`/api/admin/posts/${post.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        response = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      setLastSaved(new Date());

      // If creating new post, redirect to edit page
      if (!isEditing) {
        router.push(`/admin/posts/${data.post.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  // Publish post
  const handlePublish = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsPublishing(true);
    setError(null);

    try {
      const postData = {
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        excerpt: excerpt.trim() || null,
        featured_image: featuredImage.trim() || null,
        content,
        status: "published",
      };

      let response;
      if (isEditing) {
        response = await fetch(`/api/admin/posts/${post.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        response = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to publish post");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish post");
    } finally {
      setIsPublishing(false);
    }
  };

  // Unpublish post
  const handleUnpublish = async () => {
    if (!isEditing) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unpublish" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to unpublish post");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unpublish post");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!isEditing) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete post");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const isLoading = isSaving || isPublishing || isDeleting;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/posts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white">
                  {isEditing ? "Edit Post" : "New Post"}
                </h1>
                {lastSaved && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing && post.status === "published" && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Draft
              </Button>

              {isEditing && post.status === "published" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUnpublish}
                  disabled={isLoading}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Unpublish
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handlePublish}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isPublishing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Globe className="h-4 w-4 mr-2" />
                  )}
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title..."
                  className="text-lg font-medium h-12"
                />
              </div>

              {/* Editor */}
              <div className="space-y-2">
                <Label>Content</Label>
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your post content here..."
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Post Settings</CardTitle>
                  <CardDescription>Configure post metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400 mr-1">
                        /blog/
                      </span>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="post-url-slug"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief description for SEO and previews..."
                      rows={3}
                    />
                  </div>

                  {/* Featured Image */}
                  <div className="space-y-2">
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input
                      id="featuredImage"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    {featuredImage && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featuredImage}
                          alt="Featured"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status Card */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Current status
                      </span>
                      <span
                        className={`font-medium ${
                          post.status === "published"
                            ? "text-green-600 dark:text-green-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    {post.published_at && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Published on
                        </span>
                        <span>
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Created
                      </span>
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Danger Zone */}
              {isEditing && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="text-base text-red-600 dark:text-red-400">
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setShowDeleteDialog(true)}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{post?.title}&quot;? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
