import mongoose, { mongo } from "mongoose";
import bcryptjs from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "Admin",
    immutable: true,
  },
  username: String,
  password: String,
});

AdminSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt());
  next();
});

AdminSchema.statics.login = async function (username, password) {
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

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
