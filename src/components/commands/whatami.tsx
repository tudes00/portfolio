import { JSX, useEffect, useState } from "react";
import MarkdownViewer from "../markdownViewer";
import { GITHUB_MARKDOWN_URL } from "@/config";

export default function WhatamiCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${GITHUB_MARKDOWN_URL}/files/whatami.md?nocache=1`)
      .then((res) => res.text())
      .then((text) => {
        setfileText(text);
        setLoading(false);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setfileText("Error loading whatami information.");
        setLoading(false);
      });
  }, [onLoadEnd]);

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative rounded-lg border-2 border-dashed border-[#be8d84]/40 bg-[#1e1e1e] shadow-md overflow-hidden w-full max-w-xl p-6">
        <h1 className="font-bold mb-4 text-yellow-400 text-2xl flex items-center gap-2">
          🧑‍💻 What I&apos;m doing right now
        </h1>
        <div className="terminal-html text-white">
          <MarkdownViewer markdownContent={fileText ?? ""} />
        </div>
      </div>
    </div>
  );
}
