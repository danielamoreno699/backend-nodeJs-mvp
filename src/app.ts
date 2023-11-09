import "dotenv/config";
import express from 'express';
import cors from 'cors';
import db from './config/mongo';

const PORT = process.env.PORT || 3001;

const app = express()

db();

app.use(cors({
    origin: '*'
}))
app.use(express.json())

// routes

app.get('/users', (req, res) => {
    res.json({ message: 'GET request to /api/users' });
});
app.post('/users', (req, res) => {
    res.json({ message: 'POST request to /api/users' });
});


// listen to the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))