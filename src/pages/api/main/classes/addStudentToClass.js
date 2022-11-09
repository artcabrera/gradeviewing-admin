import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { student, classId } = req.body;
  await dbconnect();

  await Class.findByIdAndUpdate(classId, {
    $push: {
      students: {
        $each: [{ studentId: student.id, name: student.name, grade: "" }],
      },
    },
  });
  res.json({ message: "OK" });
}
