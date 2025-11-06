import Fastify from "fastify";
import { Telegraf } from "telegraf";

const fastify = Fastify({ logger: true });

// BOT TOKEN (Replit / Render environment-dan gəlir)
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN tapılmadı!");
  process.exit(1);
}
const ADMIN_CHAT_ID = 8582609346;
const bot = new Telegraf(8490375470:AAGpuHaX37fEKmpEU--Kx23-W36-ZBJh68o);

// Sadə test komandası
bot.command("start", (ctx) => ctx.reply("Brat, sistem aktivdir ✅"));
bot.command("status", (ctx) => {
  ctx.reply("Status ✅ Sistem problemsiz işləyir, Brat.");
});

bot.command("approve", (ctx) => {
  ctx.reply("✅ Təsdiqləndi Brat. Sistem icazəsi verildi.");
});

bot.command("report", (ctx) => {
  ctx.reply("📊 Qısa hesabat:\n• Server aktivdir\n• Webhook işləyir\n• Bot cavab verir");
});
// Webhook route
fastify.post("/api/telegram/webhook", async (req, reply) => {
  try {
    await bot.handleUpdate(req.body);
    reply.send({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    reply.send({ ok: false });
  }
});

// Health check
fastify.get("/", async () => {
  return { status: "Agent API Brat is running ✅" };
});

// Serveri işə sal
fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" })
  .then(() => console.log("✅ Server işə düşdü"))
  .catch((err) => console.error(err));
