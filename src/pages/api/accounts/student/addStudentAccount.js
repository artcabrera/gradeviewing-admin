import Student from "../../../../database/models/Student";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const {
    username,
    password,
    firstname,
    middlename,
    lastname,
    suffixname,
    strand,
    gradeLevel,
  } = req.body;
  await dbconnect();

  const newStudent = new Student({
    username,
    password,
    firstname,
    middlename,
    lastname,
    suffixname,
    strand,
    gradeLevel,
  });

  await newStudent.save();

  res.json({ message: "OK" });
}
