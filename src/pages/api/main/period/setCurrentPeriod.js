import Period from "../../../../database/models/Period";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { semester, schoolyear } = req.body;
  await dbconnect();

  await Period.updateMany({ isCurrent: false });

  const newPeriod = new Period({ semester, schoolyear, isCurrent: true });

  await newPeriod.save();
  res.json({ message: "OK" });
}
