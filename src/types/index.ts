//карточка товара
export interface ICardItem {
	id: string; //уникальный идентификатор товара
	description?: string; //описание товара (необязательное)
	image?: string; //URL изображения товара
	title: string; //название товара
	category?: string;
	price: number | null; //цена товара
	itemIndex?: number;
}

//превью карточки
export interface IPreviewCard {
	description: HTMLElement;
	buyButton: HTMLButtonElement;
}

//каталог
export interface ICatalog {
	counter: number;
	catalog: HTMLElement[];
	wrapper: HTMLElement;
	basket: HTMLElement;
	locked: boolean;
}

//контакты заказа
export interface IOrderContacts {
	email: string; //электронная почта покупателя
	phone: string; //телефонный номер покупателя
}

//оплата заказа
export interface IOrderPayments {
	payment: string; //способ оплаты
	address: string; //адрес доставки
}

//заказ
export interface IOrder extends IOrderContacts, IOrderPayments {
	total: number; //общая стоимость заказа
	items: string[]; //список идентификаторов товаров в заказе
}

//респонс заказа
export interface IOrderResult {
	id: string; //идентификатор заказа
	total: number; //итоговая стоимость заказа
}

//состояние приложения
export interface IAppState {
	catalog: ICardItem[];
	order: IOrder | null;
	preview: string | null;
}

//действия карточек
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

//состояние корзины
export interface IBasketState {
	basketArray: ICardItem[];
}

//корзина
export interface IBasketView {
	ul: HTMLElement[];
	counter: number;
}

//модальное окно
export interface IModalData {
	content: HTMLElement;
}

//страница успеха
export interface ISuccessPage {
	onClick: (event: MouseEvent) => void;
	counter?: number;
}

//ошибки валидации форм
export type FormErrors = Partial<Record<keyof IOrder, string>>;

//состояние формы
export interface IFormState {
	valid: boolean;
	errors: string[];
}
