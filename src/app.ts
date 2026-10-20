import express from 'express';
import dontenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import path from 'path';
import authentication from '#/routes/auth/auth.routes.js'
import user from '#/routes/user/user.routes.js'

const app = express();
const envPath =  path.resolve(process.cwd(),".env")

dontenv.config({path:envPath,debug:true,encoding:"utf8",quiet:true})
const allowedOrigin = process.env.CLIENT_URL;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin === allowedOrigin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 

app.use('/api/auth',authentication);
app.use('/api/user',user)

export default app;