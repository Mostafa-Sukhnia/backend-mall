import TelegramBot from "node-telegram-bot-api";
import { prisma } from "./prisma.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, "أرسل رقم هاتفك للتحقق!", {
    reply_markup: {
      keyboard: [[{ text: "إرسال رقم الهاتف", request_contact: true }]],
      one_time_keyboard: true,
    },
  });
});

// استقبال رقم الهاتف
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.contact || !msg.contact.phone_number) {
    await bot.sendMessage(
      chatId,
      "❌ الرجاء إرسال رقم هاتفك باستخدام الزر فقط."
    );
    return;
  }

  let phone_number = msg.contact.phone_number;
  phone_number = "+" + phone_number;

  console.log("Received contact:", phone_number);

  // ======================================================
  // 1) التحقق من رقم هاتف المتجر (الجديد) — دون المساس بالتحقق القديم
  // ======================================================
  const store = await prisma.stores.findFirst({
    where: {
      phon_number: phone_number,
      state_of_create_store: "PENDING",
    },
  });
  if (store.is_phone_verified) {
    await bot.sendMessage(chatId, "رقم هاتف متجرك تم التحقق منه مسبقًا.");
    return;
  }
  if (store) {
    const otp = store.verified_phone_code;

    const msgText = `
*طلب إنشاء متجر جديد قيد التحقق*
رقم الهاتف: \`${phone_number}\`
*كود التحقق:* \`${otp}\`
_الكود صالح لمدة 15 دقيقة_
    `;

    await bot.sendMessage(chatId, msgText, { parse_mode: "Markdown" });

    console.log(`OTP sent for store (${phone_number}): ${otp}`);

    return; // مهم جداً: كي لا يدخل على التحقق القديم
  }

  // ======================================================
  // 2) التحقق القديم كما هو — بدون أي تغيير
  // ======================================================
  const user = await prisma.users.findUnique({
    where: { phone_number },
  });

  console.log("User from DB:", user);

  if (!user) {
    await bot.sendMessage(chatId, "رقم هاتفك غير مسجل لدينا.");
    return;
  }

  if (user.is_phone_verified) {
    await bot.sendMessage(chatId, "رقم هاتفك تم التحقق منه مسبقًا.");
    return;
  }

  const otpUser = user.verified_phone_code;

  const userMsg = `
تم العثور على حسابك:
رقم الهاتف: \`${phone_number}\`
*كود التحقق:* \`${otpUser}\`
_صالح لمدة 15 دقيقة_
  `;

  await bot.sendMessage(chatId, userMsg, { parse_mode: "Markdown" });

  console.log(`OTP sent to user (${phone_number}): ${otpUser}`);
});

export default bot;
