import Strand from "../../../../database/models/Strand";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id, name, description } = req.body;
  await dbconnect();

  await Strand.updateOne({ id }, { name, description });
  res.json({ message: "OK" });
}
