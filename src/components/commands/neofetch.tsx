import { JSX, useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function NeoFetchCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/files/neofetch.txt")
      .then((res) => res.text())
      .then((text) => {
        setfileText(text);
        setLoading(false);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [onLoadEnd]);

  if (fileText !== null) {
    const sanitizedHtmlContent = DOMPurify.sanitize(fileText, { ADD_ATTR: ['target'] });
    return (
      <div
        className="terminal-html"
        dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      />
    );
  }

  if (!loading) {
    return <span>Error when loading neofetch file</span>;
  }

  return <span>Loading ...</span>;
}
