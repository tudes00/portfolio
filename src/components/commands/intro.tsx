import { JSX, useEffect, useState } from "react";

export default function IntroCommand({
  onLoadEnd,
}: {
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/files/intro.txt")
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
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: fileText }}
      />
    );
  }
  if (!loading) return <span>Error when loading intro file</span>;

  return <span>Loading...</span>;
}
