import { users } from "./mockData/users";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./dbConnect";
import User from "./models/user";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name:"Credentials",
      credentials:{
        email:{label:"Email",type:"email"},
        password:{label:"Password",type:"password"}
      },
      async authorize(credentials){
        await connectToDatabase;

        const user =await User.findOne({email:credentials.email});

        if(!user){
          throw new Error("No user found with this email")
        }

        const isValid = credentials.password === user.password;

        if(!isValid){
          throw new Error("Incorrect Password")
        }

        return {id:user._id,email:user.email,name:user.username};
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  
  callbacks: {
    async session({session,token}){
      if(token){
        session.user.id = token.sub;
      }
      return session;
    }
  },
};
