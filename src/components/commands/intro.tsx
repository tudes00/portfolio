import { JSX, useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function IntroCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setFileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [asciiSize, setAsciiSize] = useState<string | null>(null);

  useEffect(() => {
    const isPhone = window.matchMedia("(max-width: 650px)").matches;
    setAsciiSize(isPhone ? "introPhone" : "intro");
  }, []);

  useEffect(() => {
    if (!asciiSize) return;

    fetch(`/files/${asciiSize}.txt`)
      .then((res) => res.text())
      .then((text) => {
        setFileText(text);
        setLoading(false);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [asciiSize, onLoadEnd]);

  if (fileText !== null) {
    const sanitizedHtmlContent = DOMPurify.sanitize(fileText, { ADD_ATTR: ['target'] });
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      />
    );
  }

  if (!loading) return <span>Error when loading intro file</span>;

  return <span>Loading...</span>;
}
