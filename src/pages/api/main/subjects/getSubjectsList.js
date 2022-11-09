import Subject from "../../../../database/models/Subject";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  await dbconnect();

  const subjects = await Subject.find();

  res.json({ subjects });
}
