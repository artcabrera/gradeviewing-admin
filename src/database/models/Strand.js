import mongoose from "mongoose";

const StrandSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.models.Strand || mongoose.model("Strand", StrandSchema);
