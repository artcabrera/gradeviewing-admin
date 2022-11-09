import mongoose, { mongo } from "mongoose";
import bcryptjs from "bcryptjs";

const TeacherSchema = new mongoose.Schema({
  role: { type: String, default: "Teacher", immutable: true },
  username: String,
  password: String,
  firstname: String,
  middlename: String,
  lastname: String,
  suffixname: String,
});

TeacherSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt());
  next();
});

TeacherSchema.statics.login = async function (username, password) {
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

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", TeacherSchema);
