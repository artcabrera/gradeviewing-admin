import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MainDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="font-inter flex h-full min-h-screen w-screen justify-center bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}
