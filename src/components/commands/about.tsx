import { JSX, useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function AboutCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);

  useEffect(() => {
    fetch("/files/about.txt")
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
     const sanitizedHtmlContent = DOMPurify.sanitize(fileText);
    return (
      <div
        className="terminal-html"
        dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      />
    );
  }

  return <span>Loading ...</span>;
}
