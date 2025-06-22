import { JSX, useEffect, useState } from "react";

export default function ProjectCommand({
  args,
  onLoadEnd,
}: {
  args?: string;
  onLoadEnd?: () => void;
}): JSX.Element {
  const [fileText, setfileText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (args) {
      fetch(`/projects/${args}.txt`)
        .then((res) => {
          if (!res.ok) {
            setfileText(null);
            setLoading(false);
            return Promise.reject();
          }
          return res.text();
        })
        .then((text) => {
          setfileText(text);
          setLoading(false);
          setTimeout(() => {
            onLoadEnd?.();
          }, 30);
        })
        .catch(() => {
          setfileText(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [args, onLoadEnd]);

  if (!args) return (
    <span>List all project here</span>
  );

  if (fileText !== null) {
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: fileText }}
      />
    );
  }

  if (!loading) {
    return <span>No project : {args}</span>;
  }
  return <span>Loading {args}...</span>;
}
