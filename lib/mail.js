import { Resend } from "resend";
const resend = new Resend('re_KwJK14cv_3v6xYh1vqr1bhsJAQyzhorFx');


export const sendDevEmail = async (email, code) => {
  try {
    const mail = await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to:[email],  
  subject: `hello world ${code}`,
  html: '<p>it works!</p>',
});

    console.log("Email sent:", mail);
    return mail; // ممكن تستخدمه لو حبيت ترجع النتيجة
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: error.message }; // للتطوير، ترجع رسالة الخطأ
  }
};
