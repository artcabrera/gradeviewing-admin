import Teacher from "../../../../database/models/Teacher";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  await dbconnect();

  const teachers = await Teacher.find();
  res.json({ teachers });
}
