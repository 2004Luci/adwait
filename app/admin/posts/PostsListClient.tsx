"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "../components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Globe,
  FileText,
  Clock,
} from "lucide-react";
import type { PostWithAuthor } from "@/lib/db/types";
import { formatDistanceToNow } from "date-fns";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface PostsListClientProps {
  initialPosts: PostWithAuthor[];
  initialTotal: number;
  user: AdminUser;
}

export function PostsListClient({
  initialPosts,
  initialTotal,
  user,
}: PostsListClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [total] = useState(initialTotal);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/posts/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== deleteId));
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handlePublishToggle = async (post: PostWithAuthor) => {
    try {
      const action = post.status === "published" ? "unpublish" : "publish";
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const { post: updatedPost } = await response.json();
        setPosts(posts.map((p) => (p.id === post.id ? { ...p, ...updatedPost } : p)));
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
              Posts
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your blog posts and dynamic pages
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({total})
          </Button>
          <Button
            variant={filter === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("published")}
          >
            Published ({posts.filter((p) => p.status === "published").length})
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("draft")}
          >
            Drafts ({posts.filter((p) => p.status === "draft").length})
          </Button>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  No posts yet
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Create your first blog post to get started
                </p>
                <Button asChild>
                  <Link href="/admin/posts/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="font-medium text-slate-900 dark:text-white hover:text-sage-600 dark:hover:text-sage-400"
                          >
                            {post.title}
                          </Link>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.status === "published" ? "default" : "secondary"
                          }
                          className={
                            post.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : ""
                          }
                        >
                          {post.status === "published" ? (
                            <Globe className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.author?.name || post.author?.email || "Unknown"}
                      </TableCell>
                      <TableCell className="text-slate-500 dark:text-slate-400">
                        {formatDistanceToNow(new Date(post.created_at), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/posts/${post.id}`}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {post.status === "published" && (
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handlePublishToggle(post)}
                            >
                              {post.status === "published" ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Globe className="h-4 w-4 mr-2" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteId(post.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this post? This action cannot be
                undone.
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
