import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp: Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number|undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC=(serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
    const priceDEF=(serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
    const upBound=1.05;
    const lowBound=0.95;
    const ratio=priceABC/priceDEF;
      return {
        price_abc:priceABC,
        price_def:priceDEF,
        ratio:ratio,
        timestamp: serverResponds[0].timestamp>serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
        upper_bound:upBound,
        lower_bound:lowBound,
        trigger_alert:(ratio>upBound||ratio<lowBound)?ratio:undefined,
      };
  }
}
