import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const StudentSchema = new mongoose.Schema({
  role: { type: String, default: "Student", immutable: true },
  username: String,
  password: String,
  firstname: String,
  middlename: String,
  lastname: String,
  suffixname: String,
  gradeLevel: Number,
  strand: String,
});

StudentSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt());
  next();
});

StudentSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("CredentialsSignin");
  }
  throw Error("CredentialsSignin");
};

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
