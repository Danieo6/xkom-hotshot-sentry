# X-kom Hot-Shot Sentry

A telegram bot notifying about new hot-shot offers on x-kom.pl

## 📦 Requirements
* Node 14+
* TypeScript Compiler

## 💡 Features
* Checking x-kom.pl for new hot-shots
* Informing about new offers on your Telegram group chat
* Uses Telegraf, Axios and Cheerio

## 📖 How to use
* Install dependencies with `npm install`.
* Copy the contents of `.env.example` to `.env` and set all variables.
* Build the project using `npm run build`.
* Run it in production using `npm run start`.
* Add your bot to your chat.
* Use the command `/initialize` to run the bot on your chat.

## ⚙️ Config

| **.env field** | **Description** | **Default** |
|----------------|-----------------|-------------|
| TELEGRAM_BOT_TOKEN | Your bots token for Telegram API | None |
| FETCH_INTERVAL | How often the bot should check for offer updates (in miliseconds). | 60000 |

---

Copyright &copy; 2021 Daniel Budziński
