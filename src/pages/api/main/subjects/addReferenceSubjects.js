import SubjectReference from "../../../../database/models/SubjectReference";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { schoolyear, semester, gradeLevel, strand, subjects } = req.body;
  await SubjectReference.findOneAndDelete({
    schoolyear,
    semester,
    gradeLevel,
    strand,
  });

  const newReference = new SubjectReference({
    schoolyear,
    semester,
    gradeLevel,
    strand,
    subjects,
  });

  await newReference.save();
  res.json({ message: "OK" });
}
