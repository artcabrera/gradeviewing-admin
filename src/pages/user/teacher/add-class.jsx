import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { Combobox, Listbox, Transition, Dialog } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/router";

const AddClass = ({ session }) => {
  const router = useRouter();
  const gradeLevels = [11, 12];
  const [strandQuery, setStrandQuery] = useState("");
  const [strand, setStrand] = useState("");
  const [gradeLevel, setGradeLevel] = useState(gradeLevels[0]);
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [referenceSubjects, setReferenceSubjects] = useState({
    subjects: [],
  });
  const [strands, setStrands] = useState([]);

  const getStrands = async () => {
    const { data } = await axios.get("/api/main/strand/getStrandsList");
    if (data && data.strands) {
      setStrands(data.strands);
    }
  };

  useEffect(() => {
    getStrands();
  }, []);

  //   useEffect(() => {
  //     getReferenceSubjects();
  //   }, [strand]);

  useEffect(() => {
    setReferenceSubjects({ subjects: [] });
    setSubject("");
    getReferenceSubjects();
  }, [strand, gradeLevel]);

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
    if (strand === "") return;
    const { data } = await axios.post("/api/main/classes/addNewClass", {
      subject,
      section,
      strand,
      gradeLevel,
      teacher: session.id,
    });
    if (data) {
      router.back();
    }
  };

  const filterStrand = strands.filter((strand) =>
    strand.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(strandQuery.toLowerCase().replace(/\s+/g, ""))
  );
  const title = `Teacher ${session.firstname} | Grade Viewing System`;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 text-5xl font-bold">Add Class</div>
        <div className="h-fit w-full max-w-lg">
          <div className="h-fit w-full text-start">
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
                name="section"
                value={section}
                placeholder="HUMSS-11A"
                onChange={(event) => setSection(event.target.value)}
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
                        <span>
                          {subject || (
                            <span className="text-gray-400">
                              {referenceSubjects.subjects.length > 0
                                ? "Select.."
                                : "No Subjects Available"}
                            </span>
                          )}
                        </span>
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
        </div>
      </div>
    </Layout>
  );
};

export default AddClass;

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
