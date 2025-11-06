import express from "express";
import TelegramBot from "node-telegram-bot-api";

const app = express();
const port = process.env.PORT || 8080;

const botToken = "8490375470:AAGpuHaX37fEKmpEU--Kx23-W36-ZBJh68o";
const adminChatId = 8582609346;

const bot = new TelegramBot(botToken, { polling: false });
app.use(express.json());

app.post("/telegram/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🧠 Brat sistem aktivdir ✅ — komandaları gözləyirəm.");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = (msg.text || "").trim();

  if (!text || text.startsWith("/")) return;

  if (text.toLowerCase().includes("drive")) {
    await bot.sendMessage(chatId, "📁 Drive əməliyyatı başlayır...");
  } else {
    await bot.sendMessage(chatId, "Səni eşidirəm, Zahid Brat 👂");
  }
});

app.get("/", (_req, res) => res.send("Agent Brat işləyir ✅"));
app.listen(port, () => console.log(`Server running on port ${port}`));
