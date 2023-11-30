import "dotenv/config";
import express from 'express';
import cors from 'cors';
import db from './config/mongo';
import routes from './routes/index'
const JWT_SECRET = process.env.JWT_SECRET || "token.02020202"
import session from 'express-session';
import cookieSession from 'cookie-session';
import {customAuth} from './utils/passport.handle'
import 'dotenv/config';
import passport from 'passport';


const PORT = process.env.PORT || 3001;


const app = express()

db();

app.use(cors({
    origin: '*'
}))


app.use(
    session({
      secret: JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, 
    })
  );

app.use(customAuth.initialize());
app.use(customAuth.session());

app.use(express.json())

// routes
app.use('/api', routes);





// listen to the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))