import Period from "../../../../database/models/Period";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  await dbconnect();

  const exists = await Period.findOne();
  if (exists) return res.json({ message: "Already set." });

  const month = new Date().getMonth();
  const semester = month < 6 ? "2nd semester" : "1st semester";
  const year = new Date().getFullYear();
  const schoolyear =
    month < 6 ? `${year - 1} - ${year}` : `${year} - ${year + 1}`;

  const newPeriod = new Period({
    semester,
    schoolyear,
    isCurrent: true,
  });
  await newPeriod.save();
  res.json({ message: "OK" });
}
