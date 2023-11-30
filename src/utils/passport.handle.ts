import 'dotenv/config';
import userModel from '../model/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { encrypt } from './bcrypt.handler';
import { createToken } from './jwt.handle';


const GOOGLE_CLIENT_ID = <string>process.env.ID_CLIENT;
const GOOGLE_CLIENT_SECRET = <string>process.env.SECRET_CLIENT;



passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/api/auth/google/callback",
        passReqToCallback   : true,
        //scope: ['profile', 'email']
    },
    async function(request, accessToken, refreshToken, profile, done) {

        try {
            const existingUser = await userModel.findOne({ email: profile.emails?.[0]?.value});

            if (existingUser) {
                console.log('user already exists in our DB', existingUser);
                const accessToken = createToken({
                    _id: existingUser._id.toString(),
                    email: existingUser.email,
                    role: existingUser.role,
                });
                console.log('existing user', existingUser, accessToken);
                return done(null, existingUser, { accessToken });
            }
            const hash = await encrypt(profile.id);
            const newUser = new userModel({
                
                name: profile.name?.givenName || '',
                last_name: profile.name?.familyName || '',
                email: profile.emails?.[0]?.value || '',
                password: hash,
                role: 'user',
            });

            await newUser.save();

            const accessToken = createToken({
                _id: newUser._id.toString(),
                email: newUser.email,
                role: newUser.role,
            });
    
            console.log('user created in our DB', newUser, accessToken);
            return done(null, newUser, { accessToken });
        } catch (error) {
            return done(error as Error);
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