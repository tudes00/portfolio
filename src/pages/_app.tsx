import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
 return (
    <>
      <Head>
        <title>Tudes</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="UTF-8"/>
        <meta name="description" content="Tudes Portfolio"/>
        <meta name="keywords" content="HTML, CSS, JavaScript"/>
        <meta name="author" content="Tudes"/>
      </Head>
      <Component {...pageProps} />
    </>
  )

}
