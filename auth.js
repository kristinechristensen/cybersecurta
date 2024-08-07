//import libraries from next-auth
import NextAuth from "next-auth";
import connectToDB from "@/utils/database"
import User from "./models/user";
import Google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";

/*Object to handle the authentication which uses
properties from NextAuth and places those in an array with Google and Credentials Object */
//signIn('google')

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[Google, 
      credentials({
        credentials: {
            email: {label: "Email", type:"email"}, 
            password: {label: "Password", type: "password"},
        },

        async authorize (credentials, req) {
            const resp = await fetch(process.env.URL+"/api/users/login", {
                method: 'POST',
                body: JSON.stringify({email:credentials.email, password:credentials.password})
              });

              const user = await resp.json(); 
              return user;  //empty object - false if person isn't found
        }
      })], 
      callbacks: {
        async signIn({ account, profile }) { //nextAuth object - account & profile
          let valid =  false; /* is the email valid? */
          if(account.provider==="google"){
            try {
              await connectToDB();
              const user = await User.findOne({emailG:profile.email}); //profile grabs data from google servers
              if(user)valid=true;
            } catch (error) {
              valid = false;
            }
          }else if(account.provider === "credentials"){  //security of account
            valid = true;
          }
          return valid;
        },
        async jwt({token, account, profile, user}){
            if(account?.provider === 'google'){  //are they signing in using oAuth - google
              try {
                await connectToDB();
                const user = await User.findOne({emailG:profile.email}); 
                token.email = user.email;  //user from the database
           
                token.gmail = user.emailG;
            
                token.name = user.firstName;
                token.userType = user.userType; 
                token.pos = user.pos || undefined; 
                token.id = user._id; //use logging in with Gcredentials
              } catch (error) {
                throw new Error(error);  //read in the terminal - troubleshooting 
              }
            }else if(user){  //these values are coming from the api end point - sending the values to the token. 
              token.name = user.firstName;
              token.email = user.email;
              token.id = user._id;//type email and password credentials login. 
              token.userType = user.userType; 
              token.gmail = user.emailG;
              token.pos = user.pos || undefined;
            }
            return token; //turn user into a token //persistant application
          },
          session({session, token}){
           session.user = token; //update the session with values set on the jwt callback
           return session;
          }
        }
});
      

