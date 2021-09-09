import { Telegraf } from "telegraf";
import { HotShot } from "./interfaces/hotshot.interface";

export class Telegram extends Telegraf {
  private chats: number[] = [];
  public initialized = false;

  constructor(apiToken: string) {
    super(apiToken);
    console.info("Bot ready. Use /initialize to start it!");

    // Register init command
    this.command("initialize", (context) => {
      if (!this.chats.includes(context.chat.id)) {
        this.chats.push(context.chat.id);
        console.info(`Bot initialized on chat: ${context.chat.id}.`);
        this.initialized = true;
        context.reply("Hi! I'm going to inform you about new hot-shots on x-kom.");
      } else {
        console.info("Bot already initialized on this chat.");
      }
    });
  }

  async sendMessage(content: string): Promise<void> {
    if (!this.initialized) {
      throw new Error("Bot is not initialized.");
    }

    for (const chat of this.chats) {
      this.telegram.sendMessage(chat, content);
    }
  }

  async sendHotShot(hotshot: HotShot): Promise<void> {
    if (!this.initialized) {
      throw new Error("Bot is not initialized.");
    }

    for (const chat of this.chats) {
      this.telegram.sendPhoto(chat, hotshot.image, {
        caption: `*${hotshot.name}*\n\n💰~${hotshot.previousPrice}zł~ ${hotshot.price}zł\n📦 Pozostało: ${hotshot.total - hotshot.sold}/${hotshot.total}\n⏰ Koniec o: ${hotshot.endTime.toLocaleString('pl-PL').replace(/\./g, '\\.')}\n\n [Przejdź do X\\-kom](https://www.x\\-kom.pl/goracy\\_strzal)`,
        parse_mode: 'MarkdownV2',
      });
    }
  }
}