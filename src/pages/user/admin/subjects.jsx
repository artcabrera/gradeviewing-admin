import axios from "axios";
import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Layout from "../../../components/Layout";
import { getSession } from "next-auth/react";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");
  const [isEditing, setEditing] = useState(false);

  const getSubjects = async () => {
    const { data } = await axios.get("/api/main/subjects/getSubjectsList");
    if (data) {
      setSubjects(data.subjects);
    }
  };

  const handleDelete = async () => {
    const { data } = await axios.post("/api/main/subjects/deleteSubject", {
      id: selectedSubject._id,
    });
    if (data) {
      setOpenDialog(false);
      setSelectedSubject("");
      getSubjects();
    }
  };

  const handleSave = async () => {
    const { data } = await axios.post("/api/main/subjects/editSubject", {
      id: editId,
      name: editName,
    });
    if (data) {
      setEditName("");
      setEditId("");
      setEditing(false);
      getSubjects();
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Subjects - Admin | Grade Viewing System</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 pb-8 text-5xl font-bold">All Subjects</div>
        {/* <div className="flex h-fit w-full max-w-xl justify-end px-4 py-2">
          <button className="text-sm text-blue-500 hover:text-blue-600">
            Add New Subject
          </button>
        </div> */}
        <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <div className="w-full">
            <div className="h-fit w-full text-sm">
              <div className="flex w-full py-2 text-start">
                <div className="h-fit w-3/4 px-4">Name</div>
                <div className="h-fit w-1/4 px-4">Actions</div>
              </div>
            </div>
            <div className="h-fit w-full">
              {subjects.length > 0 &&
                subjects.map((subject, index) => (
                  <div
                    key={index}
                    className={`flex h-fit w-full border-b py-4 text-sm font-semibold ${
                      index % 2 === 0 && "bg-white"
                    }`}
                  >
                    {isEditing && editId === subject._id ? (
                      <>
                        <div className="h-fit w-3/4 px-4">
                          <input
                            autoFocus
                            value={editName}
                            className="h-fit w-full border-b bg-transparent"
                            onChange={(event) =>
                              setEditName(event.target.value)
                            }
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
                        <div className="h-fit w-3/4 px-4">{subject.name}</div>
                        <div className="flex h-fit w-1/4 items-center px-4">
                          <button
                            onClick={() => {
                              setEditId(subject._id);
                              setEditName(subject.name);
                              setEditing(true);
                            }}
                            className="flex w-1/2 items-center text-green-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSubject(subject);
                              setOpenDialog(true);
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
                    <div className="text-center">Delete Subject</div>
                    <div className="py-4 text-center text-sm">
                      Are you sure you want to delete {selectedSubject.name}?
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

export default Subjects;

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
