require('dotenv').config({ path: `${__dirname}/../.env` });
import { Config } from "./config";
import { Telegram } from "./telegram";
import { Xkom } from "./xkom";

if (!Config.bot.apiToken) {
  throw new Error("API token can't be empty!");
}

const telegram = new Telegram(Config.bot.apiToken);
telegram.launch();

const xkom = new Xkom();

const fetchInterval = setInterval(async () => {
  const hotShot = await xkom.checkHotShot();

  if (hotShot) {
    telegram.sendHotShot(hotShot);
  }
}, Config.bot.fetchInterval);

process.once("SIGINT", () => {
  clearInterval(fetchInterval);
  telegram.stop("SIGINT");
});

process.once("SIGTERM", () => {
  clearInterval(fetchInterval);
  telegram.stop("SIGTERM");
});
