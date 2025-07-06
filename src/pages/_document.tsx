import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<!-- orangutan ❤️ --> <!-- I wonder what this password could be used for....🤔 -->",
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
