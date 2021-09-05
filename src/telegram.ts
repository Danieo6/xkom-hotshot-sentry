import { Telegraf } from "telegraf";
import { Message } from "typegram";
import { HotShot } from "./interfaces/hotshot.interface";

export class Telegram extends Telegraf {
  private chatId = 0;
  public initialized = false;

  constructor(apiToken: string) {
    super(apiToken);
    console.info("Bot ready. Use /initialize to start it!");

    // Register init command
    this.command("initialize", (context) => {
      if (!this.chatId) {
        this.chatId = context.chat.id;
        this.initialized = true;
        console.info("Bot initialized.");
        context.reply("Hi! I'm going to inform you about new hot-shots on x-kom.");
      } else {
        console.info("Bot already initialized.");
      }
    });
  }

  async sendMessage(content: string): Promise<Message.TextMessage> {
    if (!this.initialized) {
      throw new Error("Bot is not initialized.");
    }

    return this.telegram.sendMessage(this.chatId, content);
  }

  async sendHotShot(hotshot: HotShot): Promise<Message.PhotoMessage> {
    if (!this.initialized) {
      throw new Error("Bot is not initialized.");
    }

    return this.telegram.sendPhoto(this.chatId, hotshot.image, {
      caption: `*${hotshot.name}*\n\n💰~${hotshot.previousPrice}zł~ ${hotshot.price}zł\n📦 Pozostało: ${hotshot.total - hotshot.sold}/${hotshot.total}\n⏰ Koniec o: ${hotshot.endTime.toLocaleString('pl-PL').replace(/\./g, '\\.')}\n\n [Przejdź do X\\-kom](https://www.x\\-kom.pl/goracy\\_strzal)`,
      parse_mode: 'MarkdownV2',
    })
  }
}