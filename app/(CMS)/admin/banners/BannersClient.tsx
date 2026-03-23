"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/app/(CMS)/admin/components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
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
  Pencil,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  GripVertical,
  Loader2,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { Banner } from "@/lib/db/types";
import { formatDistanceToNow } from "date-fns";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface BannersClientProps {
  initialBanners: Banner[];
  user: AdminUser;
}

export function BannersClient({ initialBanners, user }: BannersClientProps) {
  const router = useRouter();
  const [banners, setBanners] = useState(initialBanners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setTitle("");
    setImageUrl("");
    setLinkUrl("");
    setIsActive(true);
    setEditingBanner(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title || "");
    setImageUrl(banner.image_url || "");
    setLinkUrl(banner.link_url || "");
    setIsActive(banner.is_active);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = {
        id: editingBanner?.id,
        title: title.trim() || null,
        image_url: imageUrl.trim() || null,
        link_url: linkUrl.trim() || null,
        is_active: isActive,
      };

      const response = await fetch("/api/admin/banners", {
        method: editingBanner ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { banner } = await response.json();
        if (editingBanner) {
          setBanners(banners.map((b) => (b.id === banner.id ? banner : b)));
        } else {
          setBanners([...banners, banner]);
        }
        setIsDialogOpen(false);
        resetForm();
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      const response = await fetch("/api/admin/banners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: banner.id,
          is_active: !banner.is_active,
          action: "toggle",
        }),
      });

      if (response.ok) {
        const { banner: updated } = await response.json();
        setBanners(banners.map((b) => (b.id === updated.id ? updated : b)));
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling banner:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });

      if (response.ok) {
        setBanners(banners.filter((b) => b.id !== deleteId));
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    } finally {
      setIsLoading(false);
      setDeleteId(null);
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
              Banners
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage homepage banners and promotional images
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/banners/carousel-settings">
                <Settings className="h-4 w-4 mr-2" />
                Carousel Settings
              </Link>
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              New Banner
            </Button>
          </div>
        </div>

        {/* Banners List */}
        {banners.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <ImageIcon className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  No banners yet
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Create your first banner to display on the homepage
                </p>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Banner
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {banners.map((banner, index) => (
              <Card key={banner.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Drag Handle (visual only for now) */}
                    <div className="text-slate-400 cursor-move">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    {/* Position */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>

                    {/* Image Preview */}
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      {banner.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={banner.image_url}
                          alt={banner.title || "Banner"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-white truncate">
                        {banner.title || "Untitled Banner"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        {banner.link_url && (
                          <a
                            href={banner.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-sage-600"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="truncate max-w-[200px]">
                              {banner.link_url}
                            </span>
                          </a>
                        )}
                        <span>•</span>
                        <span>
                          Created{" "}
                          {formatDistanceToNow(new Date(banner.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={banner.is_active}
                          onCheckedChange={() => handleToggleActive(banner)}
                        />
                        <span className="text-sm text-slate-500 w-16">
                          {banner.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(banner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(banner.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Edit Banner" : "New Banner"}
              </DialogTitle>
              <DialogDescription>
                {editingBanner
                  ? "Update the banner details"
                  : "Create a new banner for the homepage"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Banner title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                />
                {imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL (optional)</Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/page"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="active">Active (visible on homepage)</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingBanner ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Banner</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this banner? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
