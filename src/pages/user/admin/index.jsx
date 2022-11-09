import { getSession } from "next-auth/react";
import Layout from "../../../components/Layout";
import {
  FiPlus,
  FiGitBranch,
  FiUsers,
  FiBookOpen,
  FiShoppingBag,
  FiArrowUp,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import Head from "next/head";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";

const Admin = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTask, setDialogTask] = useState(null);

  const AddNewStrand = () => {
    const [addStrandTitle, setAddStrandTitle] = useState("");
    const [addStrandDescription, setAddStrandDescription] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (addStrandTitle === "" || addStrandDescription === "") return;
      const { data } = await axios.post("/api/main/strand/addNewStrand", {
        title: addStrandTitle,
        description: addStrandDescription,
      });
      if (data) {
        if (data.message === "OK") {
          setOpenDialog(false);
        }
      }
    };

    return (
      <div className="h-fit w-full text-start">
        <div className="pb-4 text-center">Add New Strand</div>
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <input
            name="title"
            value={addStrandTitle}
            placeholder="HUMSS"
            onChange={(event) => setAddStrandTitle(event.target.value)}
            className="mb-2 h-fit w-full rounded-lg py-2 px-4"
          ></input>
          <label htmlFor="title" className="text-sm">
            Description
          </label>
          <input
            name="description"
            value={addStrandDescription}
            placeholder="Humanities and Social Sciences"
            onChange={(event) => setAddStrandDescription(event.target.value)}
            className="h-fit w-full rounded-lg py-2 px-4"
          ></input>
          <button
            type="submit"
            className="mt-4 h-fit w-full rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    );
  };

  const UpdateSemesterPeriod = () => {
    const semesters = ["1st semester", "2nd semester", "Summer"];
    const [yearLast, setYearLast] = useState("");
    const [yearNow, setYearNow] = useState("");
    const [semester, setSemester] = useState(semesters[0]);

    const handleSubmit = async () => {
      if (yearLast === "" || yearNow === "") return;
      const { data } = await axios.post("/api/main/period/setCurrentPeriod", {
        semester,
        schoolyear: `${yearLast} - ${yearNow}`,
      });
      if (data && data.message === "OK") {
        setOpenDialog(false);
      }
    };

    return (
      <div className="h-fit w-full text-start">
        <div className="pb-4 text-center">Update Semester Period</div>
        <div className="h-fit w-full">
          <div className="w-full text-start text-sm">Semester</div>
          <div className="flex w-full">
            <button
              onClick={() => setSemester(semesters[0])}
              className={`h-fit w-1/3 rounded-l-full py-1 ${
                semester === semesters[0]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500/25"
              }`}
            >
              1st
            </button>
            <button
              onClick={() => setSemester(semesters[1])}
              className={`h-fit w-1/3 py-1 ${
                semester === semesters[1]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500/25"
              }`}
            >
              2nd
            </button>
            <button
              onClick={() => setSemester(semesters[2])}
              className={`h-fit w-1/3 rounded-r-full py-1 ${
                semester === semesters[2]
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500/25"
              }`}
            >
              Summer
            </button>
          </div>
        </div>
        <div className="w-full pt-4 text-start text-sm">Schoolyear</div>
        <div className="flex h-fit w-full justify-between">
          <input
            value={yearLast}
            onChange={(event) => setYearLast(event.target.value)}
            placeholder="2022"
            className="w-full rounded-lg px-4 py-2"
          ></input>
          <div className="px-4 py-2">-</div>
          <input
            value={yearNow}
            onChange={(event) => setYearNow(event.target.value)}
            placeholder="2023"
            className="w-full rounded-lg px-4 py-2"
          ></input>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 h-fit w-full rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        >
          Set
        </button>
      </div>
    );
  };

  const AddNewTeacher = () => {
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [suffixname, setSuffixname] = useState("");
    const [next, setNext] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (firstname === "" || lastname === "") return;

      const { data } = await axios.post(
        "/api/accounts/teacher/addTeacherAccount",
        { username, password, firstname, middlename, lastname, suffixname }
      );
      if (data && data.message === "OK") {
        setOpenDialog(false);
      }
    };

    return (
      <div className="h-fit w-full">
        <div className="text-center">Add New Teacher</div>
        <form onSubmit={handleSubmit} className="text-start">
          {!next ? (
            <div>
              <label htmlFor="title" className="text-sm">
                Firstname
              </label>
              <input
                name="firstname"
                value={firstname}
                placeholder="Juan"
                onChange={(event) => setFirstname(event.target.value)}
                className="mb-2 h-fit w-full rounded-lg py-2 px-4"
              ></input>
              <label htmlFor="title" className="text-sm">
                Middlename
              </label>
              <input
                name="middlename"
                value={middlename}
                placeholder="Dela"
                onChange={(event) => setMiddlename(event.target.value)}
                className="mb-2 h-fit w-full rounded-lg py-2 px-4"
              ></input>
              <label htmlFor="title" className="text-sm">
                Lastname
              </label>
              <input
                name="lastname"
                value={lastname}
                placeholder="Cruz"
                onChange={(event) => setLastname(event.target.value)}
                className="mb-2 h-fit w-full rounded-lg py-2 px-4"
              ></input>
              <label htmlFor="title" className="text-sm">
                Suffix / Ex.
              </label>
              <input
                name="suffixname"
                value={suffixname}
                placeholder="Jr"
                onChange={(event) => setSuffixname(event.target.value)}
                className="mb-2 h-fit w-full rounded-lg py-2 px-4"
              ></input>
              <button
                onClick={() => setNext(true)}
                type="button"
                className="mt-4 h-fit w-full rounded-lg py-2 px-4 text-blue-500 hover:text-blue-600"
              >
                Next &rarr;
              </button>
            </div>
          ) : (
            <div>
              <div className="w-full">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  label="Username"
                  value={username}
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
                className="mt-4 h-fit w-full rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-gray-500"
              >
                Add
              </button>
              <button
                onClick={() => setNext(false)}
                type="button"
                className="mt-4 h-fit w-full rounded-lg py-2 px-4 text-blue-500 hover:text-blue-600"
              >
                &larr; Back
              </button>
            </div>
          )}
        </form>
      </div>
    );
  };

  const AddNewSubject = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (name === "") return;

      const { data } = await axios.post("/api/main/subjects/addNewSubject", {
        name,
      });
      if (data && data.message === "OK") {
        setOpenDialog(false);
      }
    };

    return (
      <div className="h-fit w-full text-start">
        <div className="pb-4 text-center">Add New Subject</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-sm">
            Subject Name
          </label>
          <input
            name="title"
            value={name}
            placeholder="Physical Education I"
            onChange={(event) => setName(event.target.value)}
            className="mb-2 h-fit w-full rounded-lg py-2 px-4"
          ></input>
          <button
            type="submit"
            className="mt-4 h-fit w-full rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Admin Tools | Grade Viewing System</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 text-5xl font-bold">Admin Tools</div>
        <div className="flex h-fit w-full space-x-4 pt-8">
          <div className="flex h-fit w-1/2 flex-col items-end space-y-6">
            <button
              onClick={() => {
                setOpenDialog(!openDialog);
                setDialogTask(<AddNewStrand />);
              }}
              className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500"
            >
              <FiPlus className="h-6 w-6 text-blue-500" />
              <span>Add New Strand</span>
            </button>
            <button
              onClick={() => {
                setOpenDialog(!openDialog);
                setDialogTask(<AddNewTeacher />);
              }}
              className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500"
            >
              <FiPlus className="h-6 w-6 text-blue-500" />
              <span>Add New Teacher</span>
            </button>
            <button
              onClick={() => {
                setOpenDialog(!openDialog);
                setDialogTask(<AddNewSubject />);
              }}
              className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500"
            >
              <FiPlus className="h-6 w-6 text-blue-500" />
              <span>Add New Subject</span>
            </button>
            <Link href="admin/subjects-prepare">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiShoppingBag className="h-6 w-6 text-blue-500" />
                <span>Prepare Subjects for Regular Students</span>
              </a>
            </Link>
            <button
              onClick={() => {
                setOpenDialog(!openDialog);
                setDialogTask(<UpdateSemesterPeriod />);
              }}
              className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500"
            >
              <FiArrowUp className="h-6 w-6 text-blue-500" />
              <span>Update Semester Period</span>
            </button>
          </div>
          <div className="flex h-fit w-1/2 flex-col items-start space-y-6">
            <Link href="admin/strands">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiGitBranch className="h-6 w-6 text-blue-500" />
                <span>View, edit, delete Strands</span>
              </a>
            </Link>
            <Link href="admin/teachers">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiUsers className="h-6 w-6 text-blue-500" />
                <span>View, edit, delete Teachers</span>
              </a>
            </Link>
            <Link href="admin/subjects">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiBookOpen className="h-6 w-6 text-blue-500" />
                <span>View, edit, delete Subjects</span>
              </a>
            </Link>
            <button className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
              <FiArrowUp className="h-6 w-6 text-blue-500" />
              <span>Update Student Grade Level</span>
            </button>
            <button className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
              <FiArrowUp className="h-6 w-6 text-blue-500" />
              <span>Update Student Type to Graduate</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 top-0 left-0 h-screen w-screen bg-black/25 ${
          openDialog ? "flex flex-col opacity-100" : "hidden opacity-0"
        } space-y-2`}
      >
        <Transition appear show={openDialog} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setOpenDialog(false)}
          >
            <div className="text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay
                  className={`${"pointer-events-none"} fixed inset-0`}
                />
              </Transition.Child>

              <span className="inline-block h-screen align-middle">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <div className="inline-block h-fit w-full max-w-xs transform space-y-2 overflow-hidden align-middle transition-all">
                  <div
                    className={`h-fit w-full max-w-xs rounded-lg bg-gray-100 px-4 py-4`}
                  >
                    {dialogTask}
                  </div>
                  <button
                    onClick={() => setOpenDialog(false)}
                    className="h-fit w-full max-w-xs rounded-lg bg-gray-100 px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Layout>
  );
};

export default Admin;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session;
    if (role === "Admin") return { props: { session } };
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
