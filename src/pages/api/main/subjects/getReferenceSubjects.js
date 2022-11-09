import SubjectReference from "../../../../database/models/SubjectReference";
import dbconnect from "../../../../database/dbconnect";
import Period from "../../../../database/models/Period";

export default async function handler(req, res) {
  const { strand, gradeLevel } = req.body;

  const { schoolyear, semester } = await Period.findOne({ isCurrent: true });

  const subjects = await SubjectReference.findOne({
    schoolyear,
    semester,
    strand,
    gradeLevel,
  });

  res.json({ subjects });
}
