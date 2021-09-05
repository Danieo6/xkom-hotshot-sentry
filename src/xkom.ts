import Axios from "axios";
import { Config } from "./config";
import { HotShot } from "./interfaces/hotshot.interface";

export class Xkom {
  private currentOffer = "";

  public async checkHotShot(): Promise<HotShot | null> {
    const hotShot = await this.getHotShot();

    if (hotShot.name === this.currentOffer) {
      console.info("Offer is not different!");
      return null;
    }

    this.currentOffer = hotShot.name;
    return hotShot;
  }

  private async getHotShot(): Promise<HotShot> {
    const { data } = await Axios.get(
      Config.xkom.hotshotUrl,
      {
        headers: {
          ...Config.headers,
          "x-api-key": Config.xkom.apiKey,
          "user-agent": this.getRandomUA(),
        },
      },
    );

    return {
      name: data.PromotionName,
      previousPrice: data.OldPrice,
      price: data.Price,
      total: data.PromotionTotalCount,
      sold: data.SaleCount,
      image: data.PromotionPhoto.Url,
      endTime: new Date(data.PromotionEnd),
    };
  }

  private getRandomUA(): string {
    return Config.userAgents[Math.floor(Math.random() * Config.userAgents.length)];
  }
}