import Student from "../../../../database/models/Student";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { gradeLevel, strand } = req.body;
  await dbconnect();

  const students = await Student.find({ gradeLevel, strand });
  res.json({ students });
}
