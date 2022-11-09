import Teacher from "../../../../database/models/Teacher";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id } = req.body;
  await dbconnect();

  await Teacher.findByIdAndDelete(id);
  res.json({ message: "OK" });
}
