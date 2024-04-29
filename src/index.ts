import './scss/styles.scss';

import { ICardItem, IOrderPayments, IOrderContacts } from './types';
import { EventEmitter } from './components/base/Events';
import { LarekAPI } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { AppState, BasketState } from './components/AppData';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CatalogCard, PreviewCard, BasketItem } from './components/Card';
import { OrderPayments } from './components/OrderPayments';
import { Success } from './components/Success';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { OrderContacts } from './components/OrderContacts';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderPaymentsTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);
const basketData = new BasketState([], events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const orderPayments = new OrderPayments(
	cloneTemplate(orderPaymentsTemplate),
	events
);
const orderContacts = new OrderContacts(
	cloneTemplate(orderContactsTemplate),
	events
);
const basket = new Basket(cloneTemplate(basketTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogCard(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Открыть лот
events.on('card:select', (item: ICardItem) => {
	appData.setPreview(item);
	console.log(item.id);
});

// Изменен товар в корзине
events.on('preview:changed', (item: ICardItem) => {
	const showItem = (item: ICardItem) => {
		const previewCard = new PreviewCard(cloneTemplate(cardPreviewTemplate), {
			onClick: () => events.emit('basketButton:click', item),
		});
		modal.render({
			content: previewCard.render({
				title: item.title,
				image: item.image,
				description: item.description,
				price: item.price,
				category: item.category,
			}),
		});

		// деактивация кнопки "В корзину", если товар бесценен
		if (item.price === null) {
			previewCard.markPriceless();
		}

		// деактивация кнопки "В корзину", если товар уже в корзине
		if (appData.order.items.includes(item.id)) {
			previewCard.markAdded();
		}
	};

	if (item) {
    showItem(item);
	} else {
		modal.close();
	}
});

//  клик по кнопке "в корзину" - отправляет данные карточки для их добавления в массив
events.on('basketButton:click', (item: ICardItem) => {
	if (!basketData.basketArray.includes(item)) {
		basketData.addToBasket(item);
		appData.order.items.push(item.id);
		appData.order.total = basketData.total();
	}
	basket.makeButtonActive(false);
	modal.close();
});

// изменен массив корзины
events.on('basket:changed', () => {
	page.counter = basketData.basketArray.length;
	basket.counter = basketData.total();
	basket.ul = basketData.basketArray.map((item) => {
		const cardForBasket = new BasketItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basketDeleteButton:click', item),
		});
		return cardForBasket.render({
			title: item.title,
			price: item.price,
			itemIndex: basketData.basketArray.indexOf(item) + 1,
		});
	});
});

//  клик по кнопке корзины на главной - внешний темплейт
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// клик "удалить" в корзине
events.on('basketDeleteButton:click', (item: ICardItem) => {
	basketData.removeFromBasket(item);
	appData.order.items.pop();
	appData.order.total = basketData.total();
	console.log(appData.order);

	// деактивировать кнопку "оформить" в очищенной корзине
	if (!basketData.basketArray.length) {
		basket.makeButtonActive(true);
	}
});

// клик "Оформить"
events.on('order:open', () => {
	modal.render({
		content: orderPayments.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});

	// Изменилось одно из полей первой формы
	events.on(
		/^order\..*:change/,
		(data: { field: keyof IOrderContacts; value: string }) => {
			appData.setOrderField(data.field, data.value);
			console.log(appData.order);
		}
	);

	// Изменилось состояние валидации первой формы
	events.on('formErrors:change', (errors: Partial<IOrderPayments>) => {
		const { address, payment } = errors;
		orderPayments.valid = !address && !payment;
		orderPayments.errors = Object.values({ address, payment })
			.filter((i) => !!i)
			.join('; ');
	});

	// Выбор способа оплаты
	events.on('paymentMethod:changed', (paymentType: HTMLButtonElement) => {
		orderPayments.setPaymentButton(paymentType.name);
		appData.setPaymentMethod(paymentType.name);
	});
});

// клик "Далее"
events.on('order:submit', () => {
	modal.render({
		content: orderContacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});

	// Изменилось состояние валидации второй формы
	events.on('formErrors:change', (errors: Partial<IOrderContacts>) => {
		const { email, phone } = errors;
		orderContacts.valid = !email && !phone;
		orderContacts.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	});

	// Изменилось одно из полей второй формы
	events.on(
		/^contacts\..*:change/,
		(data: { field: keyof IOrderContacts; value: string }) => {
			appData.setOrderField(data.field, data.value);
			console.log(appData.order);
		}
	);
});

// клик Оплатить
events.on('contacts:submit', () => {
	console.log('отладка - клик Оплатить');
	api
		.postOrder(appData.order)
		.then(() => {
			const successScreen = new Success(cloneTemplate(successTemplate), {
				onClick: () => events.emit('successScreenButton:click'),
			});
			modal.render({
				content: successScreen.render({
					counter: basketData.total(),
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Клик  "За новыми покупками"
events.on('successScreenButton:click', () => {
	basketData.clearBasket();
	appData.order.items = [];
	modal.close();
	basket.makeButtonActive(true);
});

// деактивировать кнопку "оформить" в изначально пустрой корзине
if (!basketData.basketArray.length) {
	basket.makeButtonActive(true);
}

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем лоты с сервера
api
	.getCardList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
