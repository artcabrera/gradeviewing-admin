import mongoose from "mongoose";

const SubjectReferenceSchema = new mongoose.Schema({
  schoolyear: String,
  semester: String,
  strand: String,
  gradeLevel: Number,
  subjects: [{ name: String }],
});

export default mongoose.models.SubjectReference ||
  mongoose.model("SubjectReference", SubjectReferenceSchema);
