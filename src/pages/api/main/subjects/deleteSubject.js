import Subject from "../../../../database/models/Subject";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id } = req.body;
  await dbconnect();

  await Subject.findByIdAndDelete(id);
  res.json({ message: "OK" });
}
