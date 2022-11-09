import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  subject: String,
  teacher: String,
  gradeLevel: Number,
  schoolyear: String,
  semester: String,
  section: String,
  strand: String,
  students: [
    {
      studentId: mongoose.SchemaTypes.ObjectId,
      name: String,
      grade: String,
    },
  ],
});

export default mongoose.models.Class || mongoose.model("Class", ClassSchema);
