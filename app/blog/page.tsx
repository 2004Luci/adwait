import { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Adwait Artha LLP",
  description:
    "Read the latest insights, news, and articles from Adwait Artha LLP on IPO advisory, corporate law, financial services, and more.",
  openGraph: {
    title: "Blog | Adwait Artha LLP",
    description:
      "Read the latest insights, news, and articles from Adwait Artha LLP.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

/**
 * Simulates a DB/API failure when ?simulate=error is in the URL.
 * Use this to test the error boundary behavior.
 */
async function maybeSimulateError(searchParams: { simulate?: string } | undefined) {
  if (searchParams?.simulate === "error") {
    throw new Error(
      "Simulated database connection failure: Unable to fetch posts. The database server may be unreachable or the connection pool has been exhausted."
    );
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ simulate?: string }>;
}) {
  const params = await searchParams;
  await maybeSimulateError(params);

  // TODO: Replace with getPosts from @/lib/db/posts when available
  const posts: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    created_at: string;
    author: { name: string | null; email: string } | null;
  }> = [];
  const total = 0;

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">Blog</h1>
          <p className="text-sage-600 text-lg">
            Insights, news, and articles from Adwait Artha LLP.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sage-600">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-sage-200">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-sage-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDistanceToNow(new Date(post.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author.name || post.author.email}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl text-sage-900">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt || post.content?.slice(0, 150)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sage-600 font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {total > posts.length && (
          <p className="mt-6 text-sage-500 text-sm">
            Showing {posts.length} of {total} posts
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
