import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './route/route.js'
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

dotenv.config();
app.use(cors());


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",Router);

const PORT =8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.listen(PORT,()=>console.log(`Server is successfully running on port ${PORT}`));

Connection(USERNAME,PASSWORD);