import express from 'express';
import {PORT} from "./config/env.js";

const app = express();

app.get("/",(req,res)=>{
    res.message(`Welcome to the server`);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
