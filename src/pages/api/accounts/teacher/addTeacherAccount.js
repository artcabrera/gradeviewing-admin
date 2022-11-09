import Teacher from "../../../../database/models/Teacher";
import dbconnect from "../../../../database/dbconnect";

export default async function handler(req, res) {
  const { username, password, firstname, middlename, lastname, suffixname } =
    req.body;
  await dbconnect();

  const newTeacher = new Teacher({
    username,
    password,
    firstname,
    middlename,
    lastname,
    suffixname,
  });

  await newTeacher.save();

  res.json({ message: "OK" });
}
