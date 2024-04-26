import { Api, ApiListResponse } from "./base/api";
import { ICardItem, IOrder, IOrderResult} from "../types";

export class LarekAPI extends Api {
  readonly cdn: string;
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCard(id: string): Promise<ICardItem> {
		return this.get(`/product/${id}`).then((item: ICardItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

  getCardList(): Promise<ICardItem[]> {
    return this.get('/product').then((data: ApiListResponse<ICardItem>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    );
  }
}