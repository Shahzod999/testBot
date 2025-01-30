require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;

const webAppUrl = "https://eternal-positively-marmoset.ngrok-free.app";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  console.log("Получено сообщение:", msg.text);
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    try {
      await bot.sendMessage(chatId, "круто ниже кнопка на сайт", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Перейти на сайт ", web_app: { url: webAppUrl } }],
          ],
        },
      });
    } catch (error) {
      console.log("Ошибка при отправке сообщения:", error.message);
    }
  }
});
console.log({ status: "ok", message: "Nice" });
