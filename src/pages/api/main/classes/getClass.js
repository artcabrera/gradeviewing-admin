import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id } = req.body;
  await dbconnect();

  const classroom = await Class.findById(id);
  res.json({ classroom });
}
