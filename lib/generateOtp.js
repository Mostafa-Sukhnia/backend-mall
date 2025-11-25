const generateOTP = () => {
  const otp = Math.floor(Math.random() * 10000);   
  const opt = otp.toString().padStart(4, "0");     
  return parseInt(opt, 10);                        
};

export default generateOTP;
