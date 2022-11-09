import axios from "axios";
import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Layout from "../../../components/Layout";
import { getSession } from "next-auth/react";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isEditing, setEditing] = useState("");
  const [ELN, setELN] = useState("");
  const [EFN, setEFN] = useState("");
  const [EMN, setEMN] = useState("");
  const [EID, setEID] = useState("");

  const getTeachers = async () => {
    const { data } = await axios.get("/api/accounts/teacher/getTeachersList");
    if (data) {
      setTeachers(data.teachers);
    }
    console.log(data);
  };

  const handleDelete = async () => {
    const { data } = await axios.post("/api/accounts/teacher/deleteTeacher", {
      id: selectedTeacher._id,
    });
    if (data) {
      setOpenDialog(false);
      setSelectedTeacher("");
      getTeachers();
    }
  };
  const handleSave = async () => {
    const { data } = await axios.post("/api/accounts/teacher/editTeacher", {
      id: EID,
      lastname: ELN,
      firstname: EFN,
      middlename: EMN,
    });
    if (data) {
      setEditing(false);
      setEFN("");
      setEMN("");
      setELN("");
      setEID("");
      getTeachers();
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Teachers - Admin | Grade Viewing System</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 pb-8 text-5xl font-bold">Teachers</div>
        {/* <div className="flex h-fit w-full max-w-xl justify-end px-4 py-2">
          <button className="text-sm text-blue-500 hover:text-blue-600">
            Add New Teacher
          </button>
        </div> */}
        <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <div className="w-full">
            <div className="h-fit w-full text-sm">
              <div className="flex w-full py-2 text-start">
                <div className="h-fit w-3/12 px-4">Lastname</div>
                <div className="h-fit w-3/12 px-4">Firstname</div>
                <div className="h-fit w-3/12 px-4">M.I, Suffix</div>
                <div className="h-fit w-3/12 px-4">Actions</div>
              </div>
            </div>
            <div className="h-fit w-full">
              {teachers.length > 0 &&
                teachers.map((teacher, index) => (
                  <div
                    key={index}
                    className={`flex h-fit w-full border-b py-4 text-sm font-semibold ${
                      index % 2 === 0 && "bg-white"
                    }`}
                  >
                    {isEditing && teacher._id === EID ? (
                      <>
                        <div className="h-fit w-1/4 px-4">
                          <input
                            autoFocus
                            value={ELN}
                            className="h-fit w-full border-b bg-transparent"
                            onChange={(event) => setELN(event.target.value)}
                          ></input>
                        </div>
                        <div className="h-fit w-1/4 px-4">
                          <input
                            value={EFN}
                            className="h-fit w-full border-b bg-transparent"
                            onChange={(event) => setEFN(event.target.value)}
                          ></input>
                        </div>
                        <div className="h-fit w-1/4 px-4">
                          <input
                            value={EMN}
                            className="h-fit w-full border-b bg-transparent"
                            onChange={(event) => setEMN(event.target.value)}
                          ></input>
                        </div>
                        <div className="flex h-fit w-1/4 items-center px-4">
                          <button
                            onClick={handleSave}
                            className="flex w-1/2 items-center text-blue-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditing(false);
                            }}
                            className="flex w-1/2 items-center text-red-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-fit w-1/4 px-4">
                          {teacher.lastname}
                          {teacher.suffixname && `, ${teacher.suffixname}`}
                        </div>
                        <div className="h-fit w-1/4 px-4">
                          {teacher.firstname}
                        </div>
                        <div className="h-fit w-1/4 px-4">
                          {teacher.middlename}
                        </div>
                        <div className="flex h-fit w-1/4 items-center px-4">
                          <button
                            onClick={() => {
                              setEID(teacher._id);
                              setELN(teacher.lastname);
                              setEMN(teacher.middlename);
                              setEFN(teacher.firstname);
                              setEditing(true);
                            }}
                            className="flex w-1/2 items-center text-green-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setOpenDialog(true);
                              setSelectedTeacher(teacher);
                            }}
                            className="flex w-1/2 items-center text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="h-4 w-full bg-white"></div>
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
                    <div className="text-center">Delete Teacher</div>
                    <div className="py-4 text-center text-sm">
                      Are you sure you want to delete{" "}
                      {selectedTeacher.firstname +
                        " " +
                        selectedTeacher.lastname}
                      ?
                    </div>
                    <button
                      onClick={handleDelete}
                      type="button"
                      className="mt-4 h-fit w-full rounded-lg bg-red-500 py-2 px-4 text-white hover:bg-red-600 disabled:bg-gray-500"
                    >
                      DELETE
                    </button>
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

export default Teachers;

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
