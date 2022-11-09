import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.models.Subject ||
  mongoose.model("Subject", SubjectSchema);
