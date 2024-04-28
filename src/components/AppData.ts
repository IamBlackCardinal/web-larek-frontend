import { Model } from "./base/Model";
import { ICardItem, IAppState, IOrder, IBasketState, FormErrors, IOrderContacts, IOrderPayments } from "../types";
import { IEvents } from "./base/Ivents";

export class AppState extends Model<IAppState> {
	catalog: ICardItem[];
	order: IOrder = {
			email: '',
			phone: '',
			items: [],
			payment: '',
			address: '',
			total: 0,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setCatalog(items: ICardItem[]) {
			this.catalog = items.map(item => new Model(item, this.events)) as unknown as ICardItem[];
			this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ICardItem) {
			this.preview = item.id;
			this.emitChanges('preview:changed', item);
	}

	setOrderField(field: keyof IOrderContacts, value: string) {
			this.order[field] = value;

			if (this.validateOrder()) {
				this.events.emit('order:ready', this.order);
			}
	}

	setPaymentMethod(value: string): void {
		this.order.payment = value;
		this.validateOrder();
	}

	validateOrder() {
			const errors: typeof this.formErrors = {};
			if (!this.order.email) {
					errors.email = 'Необходимо указать email';
			}
			if (!this.order.phone) {
					errors.phone = 'Необходимо указать телефон';
			}
			if (!this.order.address) {
				errors.address = 'Необходмимо указать адрес';
			}
			if (!this.order.payment) {
				errors.payment = 'Необходимо выбрать метод оплаты';
			}
			this.formErrors = errors;
			this.events.emit('formErrors:change', this.formErrors);
			return Object.keys(errors).length === 0;
	}
}

export class BasketState extends Model<IBasketState>{
	basketArray: ICardItem[];

	constructor(basketArray: ICardItem[], protected events: IEvents) {
		super({}, events)
		this.basketArray = basketArray;
	}

	addToBusket(item: ICardItem) {
		this.basketArray.push(item);
		this.emitChanges('basket:changed', item);
	}

	removeFromBusket(item: ICardItem) {
		this.basketArray.shift();
		this.emitChanges('basket:changed', item);
	}

	clearBasket(): void {
		this.basketArray = [];
		this.emitChanges('basket:changed');
	}

	total(): number {
		let total = 0;
		this.basketArray.forEach(element => {
			total += element.price;
		});
		return total;
	}
}