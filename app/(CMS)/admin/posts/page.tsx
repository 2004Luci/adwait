import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPosts } from "@/lib/db/posts";
import { PostsListClient } from "./PostsListClient";

/**
 * Posts List Page
 *
 * Displays all blog posts with filtering and management options.
 */
export default async function PostsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch initial posts
  const { posts, total } = await getPosts({ limit: 50 });

  return <PostsListClient initialPosts={posts} initialTotal={total} user={session.user} />;
}
