import { Resend } from "resend";
const resend = new Resend("re_KwJK14cv_3v6xYh1vqr1bhsJAQyzhorFx");

export const sendDevEmail = async (
  email,
  code,
  type = "virefid your account"
) => {
  try {
    const mail = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `${
        type === "password" ? "Password Reset" : "Email Verification"
      } Code`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #007bff;">
        ${type === "password" ? "Password Reset Request" : "Verify Your Email"}
      </h2>
      <p>
        ${
          type === "password"
            ? "You requested to reset your password. Use the code below to proceed:"
            : "Please use the code below to verify your email:"
        }
      </p>
      <p style="font-size: 24px; font-weight: bold; color: #ff5722;">${code}</p>
      <p style="margin-top: 10px;">This code will expire in 15 minutes.</p>
      <hr>
      <p style="font-size: 12px; color: #999;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `,
    });

    console.log("Email sent:", mail);
    return mail;
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: error.message };
  }
};
