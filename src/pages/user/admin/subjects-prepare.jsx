import { Combobox, Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import { getSession } from "next-auth/react";

const gradeLevels = [11, 12];

const PrepareSubjects = () => {
  const [period, setPeriod] = useState({ semester: "", schoolyear: "" });
  const [strands, setStrands] = useState([]);
  const [gradeLevel, setGradeLevel] = useState(gradeLevels[0]);
  const [strand, setStrand] = useState(
    (strands.length > 0 && strands[0].name) || "Strand"
  );
  const [referenceSubjects, setReferenceSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(referenceSubjects);

  const [allSubjects, setAllSubjects] = useState([]);
  const [subsQuery, setSubsQuery] = useState("");

  const handleSaveSubjects = async () => {
    if (strand === "Strand") return;
    await axios.post("/api/main/subjects/addReferenceSubjects", {
      schoolyear: period.schoolyear,
      semester: period.semester,
      strand,
      gradeLevel,
      subjects: selectedSubjects,
    });
    getReferenceSubjects();
  };

  const getPeriod = async () => {
    const { data } = await axios.get("/api/main/period/getCurrentPeriod");
    if (data && data.period) {
      setPeriod(data.period);
    }
  };

  const getStrands = async () => {
    const { data } = await axios.get("/api/main/strand/getStrandsList");
    if (data && data.strands) {
      setStrands(data.strands);
    }
  };

  const getReferenceSubjects = async () => {
    const { data } = await axios.post(
      "/api/main/subjects/getReferenceSubjects",
      {
        schoolyear: period.schoolyear,
        semester: period.semester,
        strand,
        gradeLevel,
      }
    );
    if (data && data.subjects) {
      setReferenceSubjects(data.subjects.subjects);
    } else setReferenceSubjects([]);
  };

  const getAllSubjects = async () => {
    const { data } = await axios.get("/api/main/subjects/getSubjectsList");
    if (data && data.subjects) {
      setAllSubjects(data.subjects);
    }
  };

  useEffect(() => {
    getPeriod();
    getStrands();
    getAllSubjects();
  }, []);

  useEffect(() => {
    getReferenceSubjects();
    setSelectedSubjects([]);
  }, [strand, gradeLevel]);

  useEffect(() => {
    setSelectedSubjects(referenceSubjects);
  }, [referenceSubjects]);

  useEffect(() => {
    if (strand === "Strand" && strands.length > 0) setStrand(strands[0].name);
  }, [strands]);

  const filterSubs = allSubjects.filter((list) =>
    list.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(subsQuery.toLowerCase().replace(/\s+/g, ""))
  );

  const checkSubjectsIfChanged = (x, y) => {
    return (
      Array.isArray(x) &&
      Array.isArray(y) &&
      x.length === y.length &&
      x.every((val, index) => val === y[index])
    );
  };
  return (
    <Layout>
      <Head>
        <title>Prepare Subjects - Admin | Grade Viewing System</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 pb-8 text-4xl font-bold">
          Prepare Subjects for
          {` ${period.semester}, ${period.schoolyear}`}
        </div>
        <div className="flex h-fit w-full max-w-xl space-x-4 py-2">
          <div className="h-fit w-1/5">
            <Listbox value={strand} onChange={setStrand}>
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button className="flex h-fit w-full items-center justify-between rounded border border-gray-300 bg-gray-100 py-1 px-2 text-xs">
                    <span>{strand}</span>
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
                    <Listbox.Options className="absolute top-8 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                      {strands.map((item, index) => (
                        <Listbox.Option
                          key={index}
                          value={item.name}
                          className={({ selected, active }) =>
                            `${
                              selected && "hidden"
                            } h-fit w-full items-center px-2 py-1 text-xs ${
                              active && "cursor-pointer underline"
                            }`
                          }
                        >
                          {item.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>
          <div className="h-fit w-1/5">
            <Listbox value={gradeLevel} onChange={setGradeLevel}>
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button className="flex h-fit w-full items-center justify-between rounded border border-gray-300 bg-gray-100 py-1 px-2 text-xs">
                    <span>Grade&nbsp;{gradeLevel}</span>
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
                    <Listbox.Options className="absolute top-8 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                      {gradeLevels.map((item, index) => (
                        <Listbox.Option
                          key={index}
                          value={item}
                          className={({ selected, active }) =>
                            `${
                              selected && "hidden"
                            } h-fit w-full items-center px-2 py-1 text-xs ${
                              active && "cursor-pointer underline"
                            }`
                          }
                        >
                          Grade&nbsp;{item}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>
          <div className="relative h-fit w-3/5">
            <Combobox
              value={selectedSubjects}
              onChange={setSelectedSubjects}
              multiple
            >
              <div className="relative">
                <Combobox.Input
                  onChange={(event) => setSubsQuery(event.target.value)}
                  placeholder="+ Add Subject"
                  className="flex h-fit w-full items-center justify-between rounded border border-gray-300 bg-white py-1 px-2 text-xs"
                />
                <FiFilter className="absolute right-2 top-[0.35rem] h-4 w-4 text-gray-400" />
              </div>

              <Combobox.Options className="absolute top-8 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                {filterSubs.length > 0 &&
                  filterSubs.map((subject, index) => (
                    <Combobox.Option
                      key={index}
                      value={subject}
                      className={({ selected, active }) =>
                        `${
                          selected && "hidden"
                        } h-fit w-full items-center px-2 py-1 text-xs ${
                          active && "cursor-pointer underline"
                        }`
                      }
                    >
                      {subject.name}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>
        <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-white">
          <div className="flex bg-gray-100 py-2 px-4">
            <div className="h-fit w-3/4 text-xs">Name</div>
            <div className="h-fit w-1/4 text-xs">Actions</div>
          </div>
          <div>
            {selectedSubjects.length > 0 &&
              selectedSubjects.map((subject, index) => (
                <div
                  key={index}
                  className={`flex border-b py-2 px-4 ${
                    index & (2 === 0) && "bg-gray-100"
                  }`}
                >
                  <div className="h-fit w-3/4 text-sm font-semibold">
                    {subject.name}
                  </div>
                  <div className="h-fit w-1/4 text-sm font-semibold">
                    <button
                      onClick={() =>
                        setSelectedSubjects(
                          selectedSubjects.filter(
                            (item) => item.name !== subject.name
                          )
                        )
                      }
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="h-4 w-full bg-white"></div>
        </div>
        <div className="flex w-full max-w-xl justify-end pt-4">
          <button
            disabled={checkSubjectsIfChanged(
              referenceSubjects,
              selectedSubjects
            )}
            onClick={handleSaveSubjects}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-500"
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PrepareSubjects;

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
