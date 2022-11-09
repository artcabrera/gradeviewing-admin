import Subject from "../../../../database/models/Subject";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { name, id } = req.body;
  await dbconnect();

  await Subject.findByIdAndUpdate(id, { name });
  res.json({ message: "OK" });
}
