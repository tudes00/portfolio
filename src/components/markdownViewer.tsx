import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownViewer({ className, markdownContent }: { className?: string; markdownContent: string }) {
    console.log(markdownContent)
  return (
    <div className={`terminal-markdown ${className}`}>
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]}
  components={{
    h1: ({ ...props }) => <h1 className="text-4xl font-bold " {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold " {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-semibold " {...props} />,
    p: ({ ...props }) => <p className="my-2 text-lg" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc list-inside ml-4" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-inside ml-4" {...props} />,
    li: ({ ...props }) => <li className="" {...props} />,
    blockquote: ({ ...props }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300 " {...props} />
    ),
    code: ({ className, ...props }) => (
      <code
        {...props}
        className={`${
          className
            ? "block bg-zinc-900 text-green-400 p-2 rounded-lg overflow-x-auto"
            : "bg-zinc-800 text-green-400 px-1 rounded"
        }`}
      />
    ),
    a: ({ ...props }) => <a className="text-blue-400 hover:underline" target="_blank" {...props} />,
    img: ({ ...props }) => (
      <img className="rounded-xl mx-auto max-h-80" {...props} />
    ),
  }}
>
  {markdownContent}
</ReactMarkdown>

    </div>
  );
}
