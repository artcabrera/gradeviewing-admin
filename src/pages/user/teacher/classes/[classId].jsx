import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import lodash from "lodash";
import _ from "lodash";

const Classroom = ({ session }) => {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState([]);
  const [classroom, setClassroom] = useState({
    subject: "",
    students: [],
    section: "",
    strand: "",
    gradeLevel: 0,
  });

  const [studentsData, setStudentsData] = useState(classroom.students);

  const [addingStudent, setAddingStudent] = useState(false);

  const getStudents = async () => {
    const { data } = await axios.post(
      "/api/accounts/student/getStudentsListBySubject",
      { gradeLevel: classroom.gradeLevel, strand: classroom.strand }
    );
    if (data && data.students) {
      setAllStudents(data.students);
    }
  };

  const students = classroom.students.map((student) => ({
    id: student.studentId,
    name: student.name,
  }));

  const studentsFromAll = allStudents.map((student) => ({
    id: student._id,
    name: `${student.firstname} ${student.middlename.charAt(0)}. ${
      student.lastname
    } ${student.suffixname}`,
  }));

  const title = `Teacher ${session.firstname} | Grade Viewing System`;

  const getClass = async () => {
    const { data } = await axios.post("/api/main/classes/getClass", {
      id: router.query.classId,
    });
    if (data) {
      setClassroom(data.classroom);
    }
  };

  const addStudentToClass = async (student) => {
    const { data } = await axios.post("/api/main/classes/addStudentToClass", {
      student,
      classId: router.query.classId,
    });
    if (data) {
      getClass();
      getStudents();
    }
  };

  useEffect(() => {
    getClass();
    getStudents();
  }, [addingStudent]);

  useEffect(() => {
    setStudentsData(classroom.students);
  }, [classroom]);

  const filteredStudents = _.differenceBy(studentsFromAll, students, "id");

  const handleChangeGrade = (index) => (event) => {
    let newStudentsData = [...studentsData];
    newStudentsData[index].grade = event.target.value;
    setStudentsData(newStudentsData);
  };

  const handleSaveChanges = async () => {
    const { data } = await axios.post("/api/main/classes/updateStudentGrades", {
      studentsData,
      classId: router.query.classId,
    });
    if (data) {
      getClass();
      getStudents();
    }
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center pt-16 pb-8">
        <div className="pt-4 text-5xl font-bold">{classroom.subject}</div>
        <div className="text-xl font-bold">Section {classroom.section}</div>
        <div className="flex h-fit w-full max-w-xl justify-end py-2">
          <button
            onClick={() => setAddingStudent(!addingStudent)}
            className={`text-sm ${
              addingStudent ? "text-red-500" : "text-blue-500"
            }`}
          >
            {addingStudent ? "Cancel" : "Add student to this subject"}
          </button>
        </div>
        {addingStudent ? (
          <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-white">
            <div className="flex bg-gray-100 py-2 px-4">
              <div className="h-fit w-5/6 text-xs">Student</div>
              <div className="h-fit w-1/6 text-xs">Action</div>
            </div>
            <div>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 === 0 && "bg-white"
                    } flex w-full border-b py-2 px-4 text-sm font-semibold`}
                  >
                    <div className="h-fit w-5/6">{item.name}</div>
                    <div className="h-fit w-1/6">
                      <button
                        onClick={() => addStudentToClass(item)}
                        className="text-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-fit w-full bg-white py-2 text-center text-gray-700">
                  No Suggested Students for this Subject
                </div>
              )}
            </div>
            <div className="flex h-4" />
          </div>
        ) : (
          <div className="h-fit w-full max-w-xl overflow-hidden rounded-lg bg-white">
            <div className="flex bg-gray-100 py-2 px-4">
              <div className="h-fit w-5/6 text-xs">Student</div>
              <div className="h-fit w-1/6 text-xs">Grade</div>
            </div>
            <div>
              {studentsData.length > 0 ? (
                studentsData.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index % 2 !== 0 && "bg-gray-100"
                    } flex w-full border-b py-2 px-4 text-sm font-semibold`}
                  >
                    <div className="h-fit w-5/6">{item.name}</div>
                    <div className="h-fit w-1/6">
                      <input
                        className="w-full border-b bg-transparent"
                        value={item.grade}
                        onChange={handleChangeGrade(index)}
                      ></input>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-fit w-full bg-white py-2 text-center text-gray-700">
                  No Student Found in this Subject
                </div>
              )}
            </div>
            <div className="flex h-4" />
          </div>
        )}
        {!addingStudent && (
          <div className="flex h-fit w-full max-w-xl justify-end py-2">
            <button
              onClick={handleSaveChanges}
              className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-gray-500"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Classroom;

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
