import { JSX, useEffect, useState } from "react";

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
    return (
      <div
        className="terminal-html"
        dangerouslySetInnerHTML={{ __html: fileText }}
      />
    );
  }

  if (!loading) {
    return <span>Error when loading neofetch file</span>;
  }

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
