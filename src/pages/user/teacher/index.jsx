import Layout from "../../../components/Layout";
import { getSession } from "next-auth/react";
import Head from "next/head";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Listbox, Transition } from "@headlessui/react";
import { FiChevronDown, FiEye, FiEyeOff, FiGrid, FiPlus } from "react-icons/fi";
import Link from "next/link";

const Teacher = ({ session }) => {
  const [classes, setClasses] = useState([]);
  const [dialogTask, setDialogTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [strands, setStrands] = useState([]);

  const getClasses = async () => {
    const { data } = await axios.post("/api/main/classes/getClassesList", {
      teacher: session.id,
    });
    if (data && data.classes) {
      setClasses(data.classes);
    }
  };

  const getStrands = async () => {
    const { data } = await axios.get("/api/main/strand/getStrandsList");
    if (data && data.strands) {
      setStrands(data.strands);
    }
  };

  const AddNewClass = () => {
    const gradeLevels = [11, 12];
    const [strandQuery, setStrandQuery] = useState("");
    const [strand, setStrand] = useState("");
    const [gradeLevel, setGradeLevel] = useState(gradeLevels[0]);
    const [section, setSection] = useState("");
    const [subject, setSubject] = useState("");
    const [referenceSubjects, setReferenceSubjects] = useState({
      subjects: [],
    });

    const getReferenceSubjects = async () => {
      const { data } = await axios.post(
        "/api/main/subjects/getReferenceSubjects",
        { strand, gradeLevel }
      );
      if (data && data.subjects) {
        setReferenceSubjects(data.subjects);
      }
    };

    const handleAddNew = async (event) => {
      event.preventDefault();
    };

    const filterStrand = strands.filter((strand) =>
      strand.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(strandQuery.toLowerCase().replace(/\s+/g, ""))
    );

    return (
      <div className="h-fit w-full text-start">
        <div className="pb-4 text-center">Add New Class</div>
        <form onSubmit={handleAddNew} className="">
          <div className="flex h-fit w-full space-x-2">
            <div className="relative flex w-2/3">
              <Combobox value={strand} onChange={setStrand}>
                <div className="w-full">
                  <label htmlFor="strand" className="text-sm">
                    Strand
                  </label>
                  <Combobox.Input
                    placeholder="Select..."
                    onBlur={() => getReferenceSubjects()}
                    className="w-full rounded-lg py-2 px-4"
                    onChange={(event) => setStrandQuery(event.target.value)}
                  />
                </div>

                <Combobox.Options className="absolute top-16 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                  {filterStrand.length > 0 &&
                    filterStrand.map((strand, index) => (
                      <Combobox.Option
                        key={index}
                        value={strand.name}
                        className={({ selected, active }) =>
                          `${
                            selected && "hidden"
                          } h-fit w-full items-center px-2 py-1 ${
                            active && "cursor-pointer underline"
                          }`
                        }
                      >
                        {strand.name}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              </Combobox>
            </div>
            <div className="w-1/3">
              <Listbox value={gradeLevel} onChange={setGradeLevel}>
                {({ open }) => (
                  <div className="relative">
                    <label htmlFor="gradeLevel" className="text-sm">
                      Grade Level
                    </label>
                    <Listbox.Button className="flex w-full items-center justify-between rounded-lg bg-white py-2 px-4">
                      <span>{gradeLevel}</span>
                      <FiChevronDown
                        className={`h-3 w-3 transform transition duration-100 ease-in ${
                          open && "rotate-180"
                        }`}
                      ></FiChevronDown>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      enter="transition ease-in duration-100"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute top-16 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                        {gradeLevels.map((grade, index) => (
                          <Listbox.Option
                            key={index}
                            value={grade}
                            className={({ selected, active }) =>
                              `${
                                selected && "hidden"
                              } h-fit w-full items-center px-2 py-1 ${
                                active && "cursor-pointer underline"
                              }`
                            }
                          >
                            {grade}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
          </div>
          <label htmlFor="section" className="text-sm">
            Section
          </label>
          <input
            name="firstname"
            // value={firstname}
            placeholder="HUMSS-11A"
            // onChange={(event) => setFirstname(event.target.value)}
            className="mb-2 h-fit w-full rounded-lg py-2 px-4"
          ></input>
          <div className="w-full">
            <Listbox value={subject} onChange={setSubject}>
              {({ open }) => (
                <div className="relative">
                  <label htmlFor="gradeLevel" className="text-sm">
                    Subject
                  </label>
                  <Listbox.Button className="flex w-full items-center justify-between rounded-lg bg-white py-2 px-4">
                    <span>{subject}</span>
                    <FiChevronDown
                      className={`h-3 w-3 transform transition duration-100 ease-in ${
                        open && "rotate-180"
                      }`}
                    ></FiChevronDown>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    enter="transition ease-in duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute top-16 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                      {referenceSubjects &&
                        referenceSubjects.subjects.length > 0 &&
                        referenceSubjects.subjects.map((subject, index) => (
                          <Listbox.Option
                            key={index}
                            value={subject.name}
                            className={({ selected, active }) =>
                              `${
                                selected && "hidden"
                              } h-fit w-full items-center px-2 py-1 ${
                                active && "cursor-pointer underline"
                              }`
                            }
                          >
                            {subject.name}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>
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

  const AddNewStudent = () => {
    const gradeLevels = [11, 12];
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [suffixname, setSuffixname] = useState("");
    const [strand, setStrand] = useState("");
    const [gradeLevel, setGradeLevel] = useState(gradeLevels[0]);
    const [next, setNext] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [strandQuery, setStrandQuery] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (firstname === "" || lastname === "") return;

      const { data } = await axios.post(
        "/api/accounts/student/addStudentAccount",
        {
          username,
          password,
          firstname,
          middlename,
          lastname,
          suffixname,
          strand,
          gradeLevel,
        }
      );
      if (data && data.message === "OK") {
        setOpenDialog(false);
      }
    };

    const filterStrand = strands.filter((strand) =>
      strand.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(strandQuery.toLowerCase().replace(/\s+/g, ""))
    );

    return (
      <div className="h-fit w-full">
        <div className="text-center">Add New Student</div>
        <form
          autoComplete="false"
          onSubmit={handleSubmit}
          className="text-start"
        >
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
                <div className="flex h-fit w-full space-x-2">
                  <div className="relative flex w-2/3">
                    <Combobox value={strand} onChange={setStrand}>
                      <div className="w-full">
                        <label htmlFor="strand" className="text-sm">
                          Strand {strand}
                        </label>
                        <Combobox.Input
                          placeholder="Select..."
                          className="w-full rounded-lg py-2 px-4"
                          onChange={(event) =>
                            setStrandQuery(event.target.value)
                          }
                        />
                      </div>

                      <Combobox.Options className="absolute top-16 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                        {filterStrand.length > 0 &&
                          filterStrand.map((strand, index) => (
                            <Combobox.Option
                              key={index}
                              value={strand.name}
                              className={({ selected, active }) =>
                                `${
                                  selected && "hidden"
                                } h-fit w-full items-center px-2 py-1 ${
                                  active && "cursor-pointer underline"
                                }`
                              }
                            >
                              {strand.name}
                            </Combobox.Option>
                          ))}
                      </Combobox.Options>
                    </Combobox>
                  </div>
                  <div className="w-1/3">
                    <Listbox value={gradeLevel} onChange={setGradeLevel}>
                      {({ open }) => (
                        <div className="relative">
                          <label htmlFor="gradeLevel" className="text-sm">
                            Grade Level
                          </label>
                          <Listbox.Button className="flex w-full items-center justify-between rounded-lg bg-white py-2 px-4">
                            <span>{gradeLevel}</span>
                            <FiChevronDown
                              className={`h-3 w-3 transform transition duration-100 ease-in ${
                                open && "rotate-180"
                              }`}
                            ></FiChevronDown>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            enter="transition ease-in duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute top-16 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                              {gradeLevels.map((grade, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={grade}
                                  className={({ selected, active }) =>
                                    `${
                                      selected && "hidden"
                                    } h-fit w-full items-center px-2 py-1 ${
                                      active && "cursor-pointer underline"
                                    }`
                                  }
                                >
                                  {grade}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      )}
                    </Listbox>
                  </div>
                </div>
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

  useEffect(() => {
    getClasses();
    getStrands();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Teacher {session.firstname} | Grade Viewing System</title>
      </Head>

      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 text-5xl font-bold">Teacher Tools</div>
        <div className="flex h-fit w-full space-x-4 pt-8">
          <div className="flex h-fit w-1/2 flex-col items-end space-y-6">
            <Link href="teacher/add-class">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiPlus className="h-6 w-6 text-blue-500" />
                <span>Add New Class</span>
              </a>
            </Link>
            <button
              onClick={() => {
                setOpenDialog(!openDialog);
                setDialogTask(<AddNewStudent />);
              }}
              className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500"
            >
              <FiPlus className="h-6 w-6 text-blue-500" />
              <span>Add New Student</span>
            </button>
          </div>
          <div className="flex h-fit w-1/2 flex-col items-start space-y-6">
            <Link href="teacher/classes">
              <a className="flex items-center space-x-4 rounded-lg border-2 border-dashed border-transparent py-2 px-4 hover:border-blue-500 hover:text-blue-500">
                <FiGrid className="h-6 w-6 text-blue-500" />
                <span>View, edit, delete Classes</span>
              </a>
            </Link>
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

export default Teacher;

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
