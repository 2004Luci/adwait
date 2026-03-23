import { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/db/posts";
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
 * Blog Listing Page
 *
 * Displays all published blog posts.
 */
export default async function BlogPage() {
  // Fetch published posts only
  const { posts } = await getPosts({ status: "published", limit: 50 });

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-sage-900 mb-4">
              Blog & Insights
            </h1>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and articles on
              financial advisory, IPO services, corporate law, and more.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sage-600 text-lg">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group bg-white border-sage-200 overflow-hidden">
                    {/* Featured Image */}
                    {post.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-sage-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {post.published_at
                            ? formatDistanceToNow(new Date(post.published_at), {
                                addSuffix: true,
                              })
                            : formatDistanceToNow(new Date(post.created_at), {
                                addSuffix: true,
                              })}
                        </span>
                        {post.author && (
                          <>
                            <span>•</span>
                            <User className="h-4 w-4" />
                            <span>{post.author.name || "Admin"}</span>
                          </>
                        )}
                      </div>
                      <CardTitle className="text-xl text-sage-900 group-hover:text-sage-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {post.excerpt && (
                        <CardDescription className="text-sage-600 line-clamp-3 mb-4">
                          {post.excerpt}
                        </CardDescription>
                      )}
                      <div className="flex items-center text-sage-500 group-hover:text-sage-600 transition-colors text-sm font-medium">
                        Read more
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
