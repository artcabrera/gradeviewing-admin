import Strand from "../../../../database/models/Strand";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { title, description } = req.body;
  await dbconnect();

  const newStrand = new Strand({
    name: title,
    description,
  });

  await newStrand.save();

  res.json({ message: "OK" });
}
