import { JSX, useEffect, useState } from "react";
import MarkdownViewer from "../markdownViewer";
import { GITHUB_MARKDOWN_URL } from "@/config";

export default function ChangelogCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${GITHUB_MARKDOWN_URL}/data/version.md?nocache=1`)
      .then((res) => res.text())
      .then((text) => {
        setfileText(text);
        setLoading(false);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setfileText("Error loading changelog information.");
        setLoading(false);
      });
  }, [onLoadEnd]);

  if (fileText !== null) {
    return (
      <MarkdownViewer markdownContent={fileText ?? ""} />
    );
  }

  if (!loading) return <span>Error when loading changelog file</span>;

  return <span>Loading...</span>;
}
