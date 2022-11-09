import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Layout from "../../../../components/Layout";

const Classes = ({ session }) => {
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    const { data } = await axios.post("/api/main/classes/getClassesList", {
      teacher: session.id,
    });
    if (data && data.classes) setClasses(data.classes);
  };
  useEffect(() => {
    getClasses();
  }, []);

  const title = `Teacher ${session.firstname} | Grade Viewing System`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 text-5xl font-bold">Classes</div>
        <div className="grid h-fit w-full grid-cols-3 gap-4 py-4">
          <Link href="add-class">
            <a className="col-span-1 flex h-40 items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-blue-500 hover:text-blue-500">
              <FiPlus className="h-6 w-6 text-blue-500" />
              <span>Add New Class</span>
            </a>
          </Link>
          {classes.length > 0 &&
            classes.map((item) => (
              <Link href={`classes/${item._id}`} prefetch={true}>
                <a className="col-span-1 h-40 space-x-2 rounded-lg bg-gradient-to-r from-amber-400 via-pink-500 to-orange-700 p-[2px] hover:bg-gradient-to-b">
                  <div className="h-full w-full rounded-md bg-gray-200 px-4 py-2 dark:bg-gray-900">
                    <h1 className="text-3xl font-extrabold">{item.subject}</h1>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {"Section " + item.section}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Classes;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session;
    if (role === "Teacher") return { props: { session } };
    else {
      return {
        redirect: {
          permanent: false,
          destination: "/401",
        },
      };
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};
