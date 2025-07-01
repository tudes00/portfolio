import { JSX, useEffect, useState } from "react";

export default function NeoFetchCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);

  useEffect(() => {
    fetch("/files/neofetch.txt")
      .then((res) => res.text())
      .then((text) => {
        setfileText(text);
        setTimeout(() => {
          onLoadEnd?.();
        }, 30);
      })
      .catch(() => {
        setfileText("Error loading neofetch information.");
      });
  }, [onLoadEnd]);

  if (fileText !== null) {
    return (
      <div
        className="terminal-html"
        dangerouslySetInnerHTML={{ __html: fileText }}
      />
    );
  }

  return <span>Loading ...</span>;
}
