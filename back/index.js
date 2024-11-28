const TelegramBot = require("node-telegram-bot-api");

const token = "7830852748:AAEs3qh-XSVUx4645yFwbfnE2XL5_Rps8fQ";
const webAppUrl = "https://smooth-immune-goat.ngrok-free.app";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    await bot.sendMessage(chatId, "круто ниже кнопка на сайт", {
      reply_markup: {
        inline_keyboard: [[{ text: "Перейти на сайт ", web_app: { url: webAppUrl } }]],
      },
    });
  }
});
console.log({ status: "ok", message: "Nice" });
