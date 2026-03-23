import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PostEditor } from "@/app/(CMS)/admin/posts/PostEditor";

/**
 * New Post Page
 *
 * Create a new blog post.
 */
export default async function NewPostPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <PostEditor user={session.user} />;
}
