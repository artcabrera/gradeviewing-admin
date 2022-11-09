import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import dbconnect from "../../../database/dbconnect";
import Admin from "../../../database/models/Admin";
import Teacher from "../../../database/models/Teacher";
import Student from "../../../database/models/Student";

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialProvider({
        name: "credentials",
        authorize: async (credentials) => {
          const { username, password } = credentials;
          await dbconnect();

          const findUser =
            (await Admin.findOne({ username })) ||
            (await Teacher.findOne({ username })) ||
            (await Student.findOne({ username }));

          let user;
          if (findUser) {
            const { role } = findUser;
            if (role === "Admin") {
              user = await Admin.login(username, password);
            } else if (role === "Teacher") {
              user = await Teacher.login(username, password);
            } else if (role === "Student") {
              user = await Student.login(username, password);
            } else return null;
          }
          if (user) return user;
          return null;
        },
      }),
    ],
    callbacks: {
      jwt: ({ token, user }) => {
        if (user) {
          token.id = user.id;
          token.role = user.role;
          token.firstname = user.firstname;
          token.middlename = user.middlename;
          token.lastname = user.lastname;
        }

        return token;
      },
      session: ({ session, token }) => {
        if (token) {
          session.id = token.id;
          session.role = token.role;
          session.firstname = token.firstname;
          session.middlename = token.middlename;
          session.lastname = token.lastname;
        }

        return session;
      },
    },
    session: {
      maxAge: 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      encryption: true,
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
