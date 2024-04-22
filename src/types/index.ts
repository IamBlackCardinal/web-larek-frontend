export enum Category {
	'софт-скил',
	'другое',
	'дополнительное',
	'кнопка',
	'хард-скил',
}

export interface ICardItem {
	id: string; //уникальный идентификатор товара
	title: string; //название товара
	description?: string; //описание товара (необязательное)
	image?: string; //URL изображения товара
	category?: Category; //категория товара
	price: number | null; //цена товара
	buttonName?: string; //название кнопки
}

export interface ICardList {
	total: number; //общее количество товаров
	items: ICardItem[]; //массив элементов ICardItem
}

export interface IOrderContacts {
	email: string; //электронная почта покупателя
	phone: string; //телефонный номер покупателя
}

export interface IOrderPayments {
	payment: string; //способ оплаты
	address: string; //адрес доставки
}

export interface IOrder extends IOrderContacts, IOrderPayments {
	total: number; //общая стоимость заказа
	items: string[]; //список идентификаторов товаров в заказе
}

export interface IOrderResult {
	id: string; //идентификатор заказа
	total: number; //итоговая стоимость заказа
}