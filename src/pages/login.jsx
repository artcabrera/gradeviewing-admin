import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Spinner from "../components/Spinner";

const Login = () => {
  const { error } = useRouter().query;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const setUpAdminIfNull = async () => {
    await axios.get("/api/accounts/admin/setUp");
  };

  const setInitialPeriod = async () => {
    await axios.get("/api/main/period/setInitialPeriod");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    if (username === "" || password === "") {
      setSubmitting(false);
      return setErrorText("Some fields are blank.");
    }
    await signIn("credentials", { username, password });
    setSubmitting(false);
  };

  const ErrorText = ({ error }) => {
    const errorMessage =
      error === "CredentialsSignin"
        ? "Incorrect username or password."
        : errorText;
    return <div>{errorMessage}</div>;
  };

  useEffect(() => {
    setUpAdminIfNull();
    setInitialPeriod();
  }, []);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Head>
        <title>Login | Grade Viewing System</title>
      </Head>
      <form onSubmit={handleSubmit} className="h-fit w-full max-w-xs space-y-4">
        <div className="relative h-48 w-full">
          <Image
            src="/assets/logo.png"
            layout="fill"
            draggable="false"
            objectFit="contain"
          />
        </div>
        <div className="w-full pb-4 text-center text-2xl font-bold">
          Grade Viewing System
        </div>
        <div className="text-center text-sm text-red-500">
          {errorText && <ErrorText error={error} />}
        </div>
        <div className="w-full">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            name="username"
            type="text"
            label="Username"
            value={username}
            disabled={submitting}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-lg py-2 px-4"
          />
        </div>
        <div className="relative w-full">
          <label htmlFor="username" className="text-sm">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            disabled={submitting}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg py-2 px-4"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-2 top-9"
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <FiEye className="h-4 w-4" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex h-fit w-full items-center justify-center space-x-2 rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-slate-500"
        >
          {submitting && <Spinner />}
          <span>Login</span>
        </button>
      </form>
    </div>
  );
};

export default Login;

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
    props: {},
  };
};
