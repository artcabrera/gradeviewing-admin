import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed top-0 left-0 flex h-16 w-full justify-center border-b border-gray-200 px-8 dark:border-gray-700">
        <div className="flex h-full w-full max-w-4xl items-center justify-between backdrop-blur ">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="relative h-12 w-12">
                <Image
                  src="/assets/logo.png"
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </div>
              <div className="text-sm">
                <h1 className="">DAO NATIONAL HIGH SCHOOL</h1>
                <h1 className="">Grade Viewing System</h1>
              </div>
            </a>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-lg border border-red-500 px-4 py-1 hover:bg-red-500/25 dark:hover:bg-red-500/50"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex h-full w-screen max-w-4xl justify-center">
        {children}
      </div>
    </>
  );
};

export default Layout;
