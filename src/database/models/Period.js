import mongoose from "mongoose";

const PeriodSchema = new mongoose.Schema({
  schoolyear: String,
  semester: String,
  isCurrent: Boolean,
});

export default mongoose.models.Period || mongoose.model("Period", PeriodSchema);
