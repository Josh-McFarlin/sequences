import React from "react";
import Head from "next/head";
import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
import "../styles/app.scss";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>Sequences</title>
    </Head>

    <Component {...pageProps} />
  </>
);

export default MyApp;
