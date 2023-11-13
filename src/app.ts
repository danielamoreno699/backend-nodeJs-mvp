import "dotenv/config";
import express from 'express';
import cors from 'cors';
import db from './config/mongo';
import routes from './routes/index'


const PORT = process.env.PORT || 3001;

const app = express()

db();

app.use(cors({
    origin: '*'
}))
app.use(express.json())

// routes
app.use('/api', routes);


// listen to the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))