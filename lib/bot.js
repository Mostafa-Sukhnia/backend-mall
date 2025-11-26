import TelegramBot from 'node-telegram-bot-api';
import { prisma } from './prisma.js';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, "أرسل رقم هاتفك للتحقق!", {
    reply_markup: {
      keyboard: [
        [{ text: "إرسال رقم الهاتف", request_contact: true }]
      ],
      one_time_keyboard: true
    }
  });
});
bot.on('contact', async (msg) => {
  const chatId = msg.chat.id;
  
  if (!msg.contact || !msg.contact.phone_number) {
    await bot.sendMessage(chatId, "❌ الرجاء إرسال رقم هاتفك باستخدام الزر فقط.");
    return;
  }

  let phone_number = msg.contact.phone_number;


  phone_number = '+' + phone_number;
  const user = await prisma.users.findUnique({
    where: { phone_number }
  });

  console.log('Received contact:', phone_number);
  console.log('User from DB:', user);

  if (!user) {
    await bot.sendMessage(chatId, "رقم هاتفك غير مسجل");
    return;
  }else if (user.is_phone_verified) {
    await bot.sendMessage(chatId, "✅ رقم هاتفك تم التحقق منه مسبقًا.");
    return;
  }else{

  const otp = user.verified_phone_code;

  const message = `
✅ الرقم تم التحقق منه: \`${phone_number}\`
*كود التحقق:* \`${otp}\`
_ينتهي خلال 15 دقائق_
`;

  await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
  console.log(`OTP sent to ${phone_number}: ${otp}`);
  }
});
export default bot;