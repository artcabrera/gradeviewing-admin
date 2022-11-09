import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { studentId } = req.body;
  await dbconnect();

  const classes = await Class.find(
    { "students.studentId": studentId },
    { schoolyear: 1, semester: 1, students: { $elemMatch: { studentId } } }
  );
  res.json({ classes });
}
