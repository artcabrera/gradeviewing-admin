import Class from "../../../../database/models/Class";
import dbconnect from "../../../../database/dbconnect";
import Period from "../../../../database/models/Period";

export default async function handler(req, res) {
  const { subject, section, strand, gradeLevel, teacher } = req.body;
  await dbconnect();
  const { schoolyear, semester } = await Period.findOne({ isCurrent: true });

  const newClass = new Class({
    subject,
    section,
    strand,
    gradeLevel,
    teacher,
    schoolyear,
    semester,
  });

  await newClass.save();

  res.json({ message: "OK" });
}
