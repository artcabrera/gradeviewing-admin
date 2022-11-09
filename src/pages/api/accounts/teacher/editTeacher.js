import Teacher from "../../../../database/models/Teacher";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id, lastname, firstname, middlename } = req.body;
  await dbconnect();

  await Teacher.findByIdAndUpdate(id, { lastname, firstname, middlename });
  res.json({ message: "OK" });
}
