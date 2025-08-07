import { JSX, useEffect } from "react";

export default function SudoCommand({ args }: { args?: string }): JSX.Element {
  useEffect(() => {}, [args]);

  if (!args) {
    return <span>Usage: sudo &lt;paswword&gt;</span>;
  }

  if (args == "orangutan") {
    return (
      <span className="green">
        Well done.. thanks for exploring my portfolio xD, here&apos;s a reward:{" "}
        <a
          target="_blank"
          className="blue-output"
          href="http://eturl.vercel.app/s/rr"
        >
          🔗 Click me
        </a>
        , hope you like it!
      </span>
    );
  } else {
    return <span className="text-red-500">Wrong password 🥸❌</span>;
  }
}
