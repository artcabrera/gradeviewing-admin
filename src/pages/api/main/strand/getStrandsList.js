import Strand from "../../../../database/models/Strand";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  await dbconnect();
  const strands = await Strand.find();

  res.json({ strands });
}
