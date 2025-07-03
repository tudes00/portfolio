import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="837c108a-c782-49da-92d7-88eb01da029b"></script>
        <title>Tudes Portfolio</title>
        <meta property="og:title" content="Tudes Portfolio" />
        <meta
          property="og:description"
          content="This is my personal portfolio"
        />
        <meta
          property="og:image"
          content="https://tudes.vercel.app/images/pp.png"
        />
        <meta property="og:url" content="https://tudes.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta charSet="UTF-8" />
        <meta name="description" content="Tudes Portfolio" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Tudes" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
