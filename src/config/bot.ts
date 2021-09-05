export const bot = {
  apiToken: <string>process.env.TELEGRAM_BOT_TOKEN,
  fetchInterval: +process.env.FETCH_INTERVAL! || 60000,
};
