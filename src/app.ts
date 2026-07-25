import express from 'express';
import dontenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import path from 'path';
const app = express();

const envPath =  path.resolve(process.cwd(),".env")

dontenv.config({path:envPath,debug:true,encoding:"utf8",quiet:true})

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Welcome to the page")
})

export default app;