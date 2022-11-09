import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import _ from "lodash";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { FiChevronDown } from "react-icons/fi";

const Student = ({ session }) => {
  const title = `${session.firstname} ${session.middlename.charAt(0)} ${
    session.lastname
  } | Grade Viewing System`;

  const [classes, setClasses] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState({
    semester: "",
    schoolyear: "",
  });

  const [grades, setGrades] = useState([]);

  const getClasses = async () => {
    const { data } = await axios.post("/api/main/classes/getClassesByStudent", {
      studentId: session.id,
    });
    if (data && data.classes) {
      setClasses(data.classes);
    }
  };

  const getGrades = async () => {
    if (selectedPeriod) {
      const { data } = await axios.post(
        "/api/main/classes/getGradesByStudent",
        {
          studentId: session.id,
          schoolyear: selectedPeriod.schoolyear,
          semester: selectedPeriod.semester,
        }
      );
      if (data && data.grades) {
        setGrades(data.grades);
      }
    }
  };

  useEffect(() => {
    getClasses();
    getGrades();
  }, []);

  useEffect(() => {
    const pds = classes.map((item) => ({
      semester: item.semester,
      schoolyear: item.schoolyear,
    }));
    const filterPds = _.uniqBy(pds, `${pds.semester}, ${pds.schoolyear}`);
    setPeriods(filterPds);
    setSelectedPeriod(filterPds[0]);
  }, [classes]);

  //   useEffect(() => {
  //     setSelectedPeriod(periods[0]);
  //   }, [periods]);

  useEffect(() => {
    getGrades();
  }, [selectedPeriod]);

  const Average = () => {
    const gradings = grades.map((item) => item.students[0].grade);
    console.log(gradings);
    if (
      _.includes(_.lowerCase(gradings), "inc") ||
      _.includes(_.lowerCase(gradings), "drp") ||
      _.includes(_.lowerCase(gradings), "drop") ||
      _.includes(_.lowerCase(gradings), "no")
    )
      return <div>&nbsp;</div>;
    const average =
      gradings.reduce((x, y) => parseInt(x) + parseInt(y), 0) / grades.length;
    return (
      <div className="w-fit px-0">Ave: {parseFloat(average).toFixed(2)}</div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pb-8 pt-4 text-5xl font-bold">Grades</div>
        <div className="h-fit w-full max-w-xl pb-4">
          <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="flex h-fit w-full items-center justify-between rounded border border-gray-300 bg-gray-100 py-1 px-2 text-xs">
                  <span>
                    {selectedPeriod &&
                      selectedPeriod.semester +
                        ", Schoolyear " +
                        selectedPeriod.schoolyear}
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
                  <Listbox.Options className="absolute top-8 left-0 h-fit w-full rounded border border-gray-300 bg-gray-100">
                    {periods.length > 0 &&
                      periods.map((item, index) => (
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
                          {item.semester + " " + item.schoolyear}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>

        <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-white">
          <div className="flex bg-gray-100 py-2 px-4">
            <div className="h-fit w-5/6 text-xs">Subject</div>
            <div className="h-fit w-1/6 text-xs">Grade</div>
          </div>
          <div>
            {grades.length > 0 ? (
              grades.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 !== 0 && "bg-gray-100"
                  } flex w-full border-b py-2 px-4 text-sm font-semibold`}
                >
                  <div className="h-fit w-5/6">{item.subject}</div>
                  <div className="h-fit w-1/6">
                    {item.students[0].grade.includes("No")
                      ? ""
                      : item.students[0].grade}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-fit w-full bg-white py-2 text-center text-gray-700">
                No Student Found in this Subject
              </div>
            )}
          </div>
          <div className="flex h-fit text-sm font-bold">
            <div className="w-5/6 px-4 py-2"></div>
            <div className="flex w-1/6 justify-start py-2 px-0 text-start">
              <Average />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student;

export const getServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    const { role } = session;
    if (role === "Student") return { props: { session } };
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
