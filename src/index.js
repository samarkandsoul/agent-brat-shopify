import express from "express";
import TelegramBot from "node-telegram-bot-api";

// ✅ ZBS modules
import { runHealthcheck } from "../zbs/healthcheck.js";
import { runReauth } from "../zbs/reauth.js";

const app = express();
const port = process.env.PORT || 8080;

const botToken = "XYZ";
const adminChatId = 123;

const bot = new TelegramBot(botToken, { polling: false });
app.use(express.json());

// ✅ Telegram webhook
app.post("/telegram/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ Telegram commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🧠 Brat sistem aktivdir ✅");
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

// ✅ Root
app.get("/", (_req, res) => res.send("Agent Brat işləyir ✅"));

app.listen(port, () => console.log(`Server running on port ${port}`));

// ✅ ZBS 10-minute loop
setInterval(async () => {
  console.log("[ZBS] Running Healthcheck...");
  const results = await runHealthcheck();

  if (results.some(r => r.status === "ERROR")) {
    console.log("[ZBS] Errors found — running reauth...");
    await runReauth();
  }
}, 600000);
