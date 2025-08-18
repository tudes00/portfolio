import { JSX } from "react";

export default function LinkCommand(): JSX.Element {
  return (
    <div>
      <div>
        <strong>📧 My mail</strong>:{" "}
        <a href="mailto:tudes0@proton.me">tudes0@proton.me</a>
      </div>
      <div>
        <strong>💬 My discord</strong>:{" "}
        <a
          href="http://eturl.vercel.app/s/discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Click Me
        </a>
      </div>
      <div>
        <strong>🦧 GitHub</strong>:{" "}
        <a
          href="http://eturl.vercel.app/s/github"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Click Me
        </a>
      </div>
      <div>
        <strong>🌐 TryHackMe</strong>:{" "}
        <a
          href="https://tryhackme.com/p/tudes"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Click Me
        </a>
      </div>
    </div>
  );
}
