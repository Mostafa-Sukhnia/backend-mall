import {Router} from 'express';
import {prisma} from "../lib/prisma.js";
const verifyChangePasswordRouter = Router();

verifyChangePasswordRouter.post("/",async (req,res)=>{
    try{
const {email, code} = req.body;
    if(!email){
       return res.status(401).json({"message":"there are no email"})
    }else if (!code){
        return res.status(401).json({"message":"there are no code"})
    }else{
        const user = await prisma.users.findUnique({
            where:{
                email
            },
        })
        if(!user){
            return res.status(404).json({"message":"user not found"})
        }
        if(user.verified_code !== code && user.password_reset_code_verified!==true){
        return res.status(401).json({"message":"your code is not match"})
    }else{
        await prisma.users.update({
            where:{
                user_id:user.user_id
            },
            data:{
                password_reset_code_verified:true
            }
        })
       return res.status(200).json({"message":"your code is match , you can change your password now"})
    }
    }
    
    
    }catch(error){
    return res.status(500).json(error)
    }
})

export default verifyChangePasswordRouter 