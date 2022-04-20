import express, { json } from 'express';
import "express-async-errors"
import cors from 'cors';
import dotenv from 'dotenv'


const app = express();

dotenv.config()

app.use(cors());
app.use(json());

app.get("/hello", (req, res) => { res.send("hello world") })


app.listen(process.env.PORT || 5000);