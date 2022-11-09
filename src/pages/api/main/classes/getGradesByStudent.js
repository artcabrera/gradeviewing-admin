import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { semester, schoolyear, studentId } = req.body;
  await dbconnect();

  const grades = await Class.find(
    { "students.studentId": studentId, semester, schoolyear },
    { subject: 1, students: { $elemMatch: { studentId } } }
  );

  res.json({ grades });
}
