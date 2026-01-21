import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug, getPosts } from "@/lib/db/posts";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { SITE_URL } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for the blog post
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Adwait Artha LLP",
    };
  }

  return {
    title: `${post.title} | Adwait Artha LLP`,
    description: post.excerpt || `Read "${post.title}" on the Adwait Artha LLP blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on the Adwait Artha LLP blog.`,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on the Adwait Artha LLP blog.`,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

/**
 * Generate static params for published posts
 */
export async function generateStaticParams() {
  const { posts } = await getPosts({ status: "published", limit: 100 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Blog Post Page
 *
 * Displays a single blog post.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Convert Tiptap JSON to HTML (basic rendering)
  const renderContent = () => {
    if (!post.content) {
      return <p className="text-sage-600">No content available.</p>;
    }

    // If content is Tiptap JSON, render it
    if (typeof post.content === "object" && "type" in post.content) {
      return <TiptapRenderer content={post.content} />;
    }

    // Fallback for plain text
    return <p className="whitespace-pre-wrap">{String(post.content)}</p>;
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-sage-600 hover:text-sage-800">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-sage-900 mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-sage-600 mb-6">{post.excerpt}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sage-500 text-sm">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), "MMMM d, yyyy")}
                  </time>
                </div>
              )}

              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name || post.author.email}</span>
                </div>
              )}

              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href,
                    });
                  }
                }}
                className="flex items-center gap-2 hover:text-sage-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-sage prose-lg max-w-none">
            {renderContent()}
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-sage-200">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Simple Tiptap JSON to React renderer
 */
function TiptapRenderer({ content }: { content: Record<string, unknown> }) {
  const renderNode = (node: Record<string, unknown>, index: number): React.ReactNode => {
    const type = node.type as string;
    const attrs = node.attrs as Record<string, unknown> | undefined;
    const children = node.content as Record<string, unknown>[] | undefined;
    const text = node.text as string | undefined;
    const marks = node.marks as { type: string; attrs?: Record<string, unknown> }[] | undefined;

    // Render text with marks
    if (type === "text" && text) {
      let element: React.ReactNode = text;

      if (marks) {
        marks.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              element = <strong key={`bold-${index}`}>{element}</strong>;
              break;
            case "italic":
              element = <em key={`italic-${index}`}>{element}</em>;
              break;
            case "underline":
              element = <u key={`underline-${index}`}>{element}</u>;
              break;
            case "strike":
              element = <s key={`strike-${index}`}>{element}</s>;
              break;
            case "code":
              element = <code key={`code-${index}`}>{element}</code>;
              break;
            case "link":
              element = (
                <a
                  key={`link-${index}`}
                  href={mark.attrs?.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-600 hover:text-sage-800 underline"
                >
                  {element}
                </a>
              );
              break;
          }
        });
      }

      return element;
    }

    // Render children
    const renderChildren = () =>
      children?.map((child, i) => renderNode(child, i));

    switch (type) {
      case "doc":
        return <div key={index}>{renderChildren()}</div>;

      case "paragraph":
        return <p key={index}>{renderChildren()}</p>;

      case "heading":
        const level = attrs?.level as number || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index}>{renderChildren()}</HeadingTag>;

      case "bulletList":
        return <ul key={index}>{renderChildren()}</ul>;

      case "orderedList":
        return <ol key={index}>{renderChildren()}</ol>;

      case "listItem":
        return <li key={index}>{renderChildren()}</li>;

      case "blockquote":
        return <blockquote key={index}>{renderChildren()}</blockquote>;

      case "codeBlock":
        return (
          <pre key={index}>
            <code>{renderChildren()}</code>
          </pre>
        );

      case "horizontalRule":
        return <hr key={index} />;

      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={attrs?.src as string}
            alt={attrs?.alt as string || ""}
            className="rounded-lg my-4"
          />
        );

      case "youtube":
        const videoId = extractYouTubeId(attrs?.src as string);
        return (
          <div key={index} className="aspect-video my-4">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        );

      case "hardBreak":
        return <br key={index} />;

      default:
        return null;
    }
  };

  return <>{renderNode(content, 0)}</>;
}

function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : "";
}
