"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/app/(CMS)/admin/components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
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
import { Badge } from "@/app/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Megaphone,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
} from "lucide-react";
import type { Announcement, AnnouncementType } from "@/lib/db/types";
import { formatDistanceToNow } from "date-fns";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AnnouncementsClientProps {
  initialAnnouncements: Announcement[];
  user: AdminUser;
}

const typeIcons: Record<AnnouncementType, React.ReactNode> = {
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
};

const typeColors: Record<AnnouncementType, string> = {
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

export function AnnouncementsClient({
  initialAnnouncements,
  user,
}: AnnouncementsClientProps) {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<AnnouncementType>("info");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setType("info");
    setIsActive(true);
    setEditingAnnouncement(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content || "");
    setType(announcement.type);
    setIsActive(announcement.is_active);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const data = {
        id: editingAnnouncement?.id,
        title: title.trim(),
        content: content.trim() || null,
        type,
        is_active: isActive,
      };

      const response = await fetch("/api/admin/announcements", {
        method: editingAnnouncement ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { announcement } = await response.json();
        if (editingAnnouncement) {
          setAnnouncements(
            announcements.map((a) => (a.id === announcement.id ? announcement : a))
          );
        } else {
          setAnnouncements([announcement, ...announcements]);
        }
        setIsDialogOpen(false);
        resetForm();
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      const response = await fetch("/api/admin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: announcement.id,
          is_active: !announcement.is_active,
          action: "toggle",
        }),
      });

      if (response.ok) {
        const { announcement: updated } = await response.json();
        setAnnouncements(
          announcements.map((a) => (a.id === updated.id ? updated : a))
        );
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling announcement:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });

      if (response.ok) {
        setAnnouncements(announcements.filter((a) => a.id !== deleteId));
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
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
              Announcements
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage homepage announcements and alerts
            </p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>

        {/* Announcements List */}
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Megaphone className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  No announcements yet
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Create your first announcement to display on the homepage
                </p>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={typeColors[announcement.type]}>
                        {typeIcons[announcement.type]}
                        <span className="ml-1 capitalize">{announcement.type}</span>
                      </Badge>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={announcement.is_active}
                        onCheckedChange={() => handleToggleActive(announcement)}
                      />
                      <span className="text-sm text-slate-500">
                        {announcement.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {announcement.content && (
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {announcement.content}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <CardDescription>
                      Created{" "}
                      {formatDistanceToNow(new Date(announcement.created_at), {
                        addSuffix: true,
                      })}
                    </CardDescription>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(announcement)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(announcement.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
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
                {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
              </DialogTitle>
              <DialogDescription>
                {editingAnnouncement
                  ? "Update the announcement details"
                  : "Create a new announcement for the homepage"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Announcement title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (optional)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Additional details..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as AnnouncementType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">
                      <span className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        Info
                      </span>
                    </SelectItem>
                    <SelectItem value="warning">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Warning
                      </span>
                    </SelectItem>
                    <SelectItem value="success">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Success
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              <Button onClick={handleSave} disabled={isLoading || !title.trim()}>
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingAnnouncement ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this announcement? This action
                cannot be undone.
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
