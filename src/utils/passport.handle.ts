import 'dotenv/config';
import userModel from '../model/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';


const GOOGLE_CLIENT_ID = <string>process.env.ID_CLIENT;
const GOOGLE_CLIENT_SECRET = <string>process.env.SECRET_CLIENT;



passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/google/callback",
        passReqToCallback   : true
    },
    async function(request, accessToken, refreshToken, profile, cb) {

        try {
            const existingUser = await userModel.findOne({ googleId: profile.id });

            if (existingUser) {
              return cb(null, existingUser);
            }
    
            const newUser = new userModel({
              googleId: profile.id,
              displayName: profile.name,
         
            });
    
            await newUser.save();
    
    
            return cb(null, newUser);
        } catch (error) {
            return cb(error as Error);
        }
          
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(id, done) {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  export { passport as customAuth };