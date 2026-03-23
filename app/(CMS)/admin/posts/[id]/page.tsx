import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPostById } from "@/lib/db/posts";
import { PostEditor } from "@/app/(CMS)/admin/posts/PostEditor";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit Post Page
 *
 * Edit an existing blog post.
 */
export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostEditor user={session.user} post={post} />;
}
