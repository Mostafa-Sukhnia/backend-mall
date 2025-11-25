import fetch from "node-fetch";
 
const BASE_URL = "https://gatewayapi.telegram.org/";

export const sendTelegramOTP = async (phone_number, code, payload = "user_payload") => {
  const endpoint = "sendVerificationMessage";
  const url = `${BASE_URL}${endpoint}`;
  const body = {
    phone_number,
    code,              
    ttl: 900,          
    payload,
    callback_url: process.env.CALLBACK_URL
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TELEGRAM_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (data.ok) {
      console.log("OTP sent:", data.result);
      return data.result;
    } else {
      console.error("Telegram API error:", data.description);
      console.error("Telegram API error:", data);
      return null;
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return null;
  }
};
