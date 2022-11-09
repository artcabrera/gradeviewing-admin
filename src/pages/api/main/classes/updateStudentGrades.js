import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { studentsData, classId } = req.body;
  await dbconnect();

  const update = await Class.findByIdAndUpdate(classId, {
    students: studentsData,
  });
  res.json({ message: "OK" });
}
