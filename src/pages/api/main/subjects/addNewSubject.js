import Subject from "../../../../database/models/Subject";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { name } = req.body;
  await dbconnect();

  const newSubject = new Subject({
    name,
  });
  await newSubject.save();
  res.json({ message: "OK" });
}
