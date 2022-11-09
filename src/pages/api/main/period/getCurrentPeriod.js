import Period from "../../../../database/models/Period";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  await dbconnect();

  const period = await Period.findOne({ isCurrent: true });
  res.json({ period });
}
