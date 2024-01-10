import express from 'express';
import cors from 'cors';
import route from './routes/routes.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import Connect from './mongodb/connect.js';
const app = express();
dotenv.config();
// Middleware
const FRONT = process.env.FRONTEND
const PORT = process.env.PORT
app.use(cors({ origin: [FRONT], credentials: true }));
app.use(bodyParser.json());

const URL = process.env.DATABASE;
// MongoDB Connection
Connect(URL);

// Routes


app.use('/', route);

// Start Server
app.listen(PORT,()=>{
    console.log('server is connected')
})