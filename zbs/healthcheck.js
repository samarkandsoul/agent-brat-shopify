// ZBS Healthcheck Module
// This module checks the health of core external services.

const fetch = require("node-fetch");

// -----------------------------
// GitHub API Check (REAL)
// -----------------------------
async function checkGitHub() {
    try {
        const response = await fetch("https://api.github.com", {
            headers: { "User-Agent": "ZBS-System" }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        return { service: "GitHub", status: "OK" };
    } catch (error) {
        return { service: "GitHub", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Render API Check (REAL)
// -----------------------------
async function checkRender() {
    try {
        const response = await fetch("https://api.render.com/health");

        if (!response.ok) {
            throw new Error(`Render API responded with status: ${response.status}`);
        }

        return { service: "Render", status: "OK" };
    } catch (error) {
        return { service: "Render", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Google Drive API Check (REAL)
// -----------------------------
async function checkGoogle() {
    try {
        const response = await fetch("https://www.googleapis.com/drive/v3/about?fields=kind");

        if (!response.ok) {
            throw new Error(`Google API responded with status: ${response.status}`);
        }

        return { service: "Google Drive", status: "OK" };
    } catch (error) {
        return { service: "Google Drive", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Telegram Bot API Check (REAL)
// -----------------------------
async function checkTelegram() {
    try {
        // Minimal test using Telegram getMe endpoint
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!telegramToken) {
            throw new Error("Telegram token is missing");
        }

        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/getMe`);

        if (!response.ok) {
            throw new Error(`Telegram API responded with status: ${response.status}`);
        }

        return { service: "Telegram", status: "OK" };
    } catch (error) {
        return { service: "Telegram", status: "ERROR", error: error.message };
    }
}

// -----------------------------
// Main healthcheck runner
// -----------------------------
async function runHealthcheck() {
    const results = [];

    results.push(await checkGitHub());
    results.push(await checkRender());
    results.push(await checkGoogle());
    results.push(await checkTelegram());

    console.log("[ZBS] Healthcheck Results:", results);
}

module.exports = { runHealthcheck };
