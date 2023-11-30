import 'dotenv/config';
import userModel from '../model/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { encrypt } from './bcrypt.handler';


const GOOGLE_CLIENT_ID = <string>process.env.ID_CLIENT;
const GOOGLE_CLIENT_SECRET = <string>process.env.SECRET_CLIENT;



passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/auth/google/callback",
        passReqToCallback   : true,
        //scope: ['profile', 'email']
    },
    async function(request, accessToken, refreshToken, profile, cb) {

        try {
            const existingUser = await userModel.findOne({ email: profile.emails?.[0]?.value});

            if (existingUser) {
                console.log('user already exists in our DB', existingUser);
                return cb(null, existingUser);
            }

            const newUser = new userModel({
                
                name: profile.name?.givenName || '',
                last_name: profile.name?.familyName || '',
                email: profile.emails?.[0]?.value || '',
                password: profile.id,
                role: 'user',
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

passport.deserializeUser(async function(_id, done) {
    try {
      const user = await userModel.findById(_id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  export { passport as customAuth };