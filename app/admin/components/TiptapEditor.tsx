"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Minus,
  Code2,
  Unlink,
} from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface TiptapEditorProps {
  content?: Record<string, unknown> | null;
  onChange?: (content: Record<string, unknown>) => void;
  placeholder?: string;
  editable?: boolean;
}

// Toolbar button component
function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-8 w-8 p-0",
        active && "bg-slate-200 dark:bg-slate-700"
      )}
    >
      {children}
    </Button>
  );
}

// Toolbar divider
function ToolbarDivider() {
  return <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />;
}

// Editor toolbar
function EditorToolbar({ editor }: { editor: Editor }) {
  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("Enter YouTube URL:");

    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-lg">
      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <Code2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Links & Media */}
      <ToolbarButton
        onClick={addLink}
        active={editor.isActive("link")}
        title="Add Link"
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      {editor.isActive("link") && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove Link"
        >
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
      )}
      <ToolbarButton onClick={addImage} title="Add Image">
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={addYoutube} title="Add YouTube Video">
        <YoutubeIcon className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  editable = true,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "rounded-lg my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || "",
    editable,
    immediatelyRender: false, // Prevent SSR hydration mismatches
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON());
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  // Update content when prop changes
  useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-t-lg animate-pulse" />
        <div className="min-h-[300px] p-4">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-2" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {editable && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

// CSS for the editor (add to globals.css or component)
export const tiptapStyles = `
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9ca3af;
    pointer-events: none;
    height: 0;
  }

  .ProseMirror:focus {
    outline: none;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
  }

  .ProseMirror iframe {
    max-width: 100%;
    border-radius: 0.5rem;
  }
`;
