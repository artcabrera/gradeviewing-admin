import Strand from "../../../../database/models/Strand";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { id } = req.body;
  await dbconnect();
  const result = await Strand.findByIdAndDelete(id);

  res.json({ result });
}
