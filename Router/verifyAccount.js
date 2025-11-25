import {Router} from "express";
import {prisma} from "../lib/prisma.js";

const  verifyAccountRouter = Router();

export default verifyAccountRouter.post("/", async (req, res) => {
try{
const {email, code} = req.body;
const user = await prisma.users.findUnique({
    where:{email}
});
  const OTP_EXPIRATION_MINUTES = 10;
  const now = new Date();
  const otpTime = new Date(user.changed_at); 
  const diffMinutes = (now - otpTime) / 1000 / 60;

  if (diffMinutes > OTP_EXPIRATION_MINUTES) {
    return res.status(403).json({ valid: false, message: "Verification code expired" });
  }else if (!user) {
    return res.status(404).json({message:"User not found"});
}else if (user.verified_code !== parseInt(code, 10)){

    return res.status(400).json({message:"Invalid verification code"});
}else{
const verificationRecord = await prisma.users.update({
    where:{user_id:user.user_id},
    data:{is_verified:true}
});
res.status(200).json({message:"Account verified successfully",data:verificationRecord});
}    

}catch(error){
    console.error("Verification error:", error);
    res.status(500).json({message:"server error"})
}
});