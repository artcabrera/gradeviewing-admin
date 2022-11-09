import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { teacher } = req.body;
  await dbconnect();

  const classes = await Class.find({ teacher });

  res.json({ classes });
}
