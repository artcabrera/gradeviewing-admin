import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="flex text-9xl font-bold">
        <h1>4</h1>
        <h1 className="animate-spin">0</h1>
        <h1>4</h1>
      </div>
      <div>
        The page you are trying to reach does not exist in this website.
      </div>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Go back</a>
      </Link>
    </div>
  );
};

export default NotFound;
