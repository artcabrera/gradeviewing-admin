import { getSession } from "next-auth/react";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session;
    return {
      redirect: {
        permanent: true,
        destination: "/user/" + role.toLowerCase(),
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};
