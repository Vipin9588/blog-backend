import express from 'express';
import dontenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import path from 'path';
import authentication from '#/routes/auth/auth.routes.js'
import user from '#/routes/user/user.routes.js'
const app = express();

const envPath =  path.resolve(process.cwd(),".env")

dontenv.config({path:envPath,debug:true,encoding:"utf8",quiet:true})
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api/auth',authentication);
app.use('/api/user',user)

export default app;