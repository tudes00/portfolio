import { JSX, useEffect, useState } from "react";
import MarkdownViewer from "../markdownViewer";

export default function AboutCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);

  useEffect(() => {
    fetch("/files/about.md")
      .then((res) => res.text())
      .then((text) => {
        setfileText(text);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setfileText("Error loading about information.");
      });
  }, [onLoadEnd]);

  if (fileText !== null) {
    return (
      <MarkdownViewer markdownContent={fileText} />
    );
  }

  return <span>Loading ...</span>;
}
