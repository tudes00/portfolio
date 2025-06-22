import { JSX, useEffect, useState } from "react";

export default function CatCommand({
  args,
  onLoadEnd,
}: {
  args?: string;
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (args === "intro.txt") {
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
    } else {
      setLoading(false);
    }
  }, [args, onLoadEnd]);

  if (!args) return <span>Usage: cat &lt;filename&gt;</span>;

  if (args === "intro.txt" && fileText !== null) {
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: fileText }}
      />
    );
  }

  if (!loading) {
    return <span>File not found: {args}</span>;
  }
  return <span>Loading {args}...</span>;
}
