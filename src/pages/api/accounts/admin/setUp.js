import Admin from "../../../../database/models/Admin";
import dbconnect from "../../../../database/dbconnect";

const handler = async (req, res) => {
  await dbconnect();

  const exists = await Admin.findOne();
  if (exists) return res.json({ message: "Admin already set up." });

  const newAdmin = new Admin({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  });

  await newAdmin.save();
  return res.json({ message: "Admin account created successfully." });
};

export default handler;
