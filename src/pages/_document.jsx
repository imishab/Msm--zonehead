import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Zone Head - Msm North " />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="white" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {/* Title */}
        <title>Zone Head - Msm North</title>
        {/* Favicon */}
        <link rel="icon" href="img/core-img/favicon.ico" />
        <link rel="apple-touch-icon" href="img/icons/icon-96x96.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="img/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="img/icons/icon-167x167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="img/icons/icon-180x180.png"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* <link rel="manifest" href="manifest.json" /> */}
      </>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
