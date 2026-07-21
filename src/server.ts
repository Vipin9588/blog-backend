import app from "#/app.js";
import {env} from '#/config/env.js'

app.listen(env.PORT,()=>{
    console.log("running....",env.JWT_ACCESS_EXPIRES_IN);
})