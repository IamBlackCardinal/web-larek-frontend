# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Основные типы данных

1. **Category (Перечисление)**

Определяет возможные категории товаров в каталоге.

Примеры значений: софт-скил, хард-скил, дополнительное, кнопка, другое.


2. **ICardItem (Интерфейс)**

Описывает структуру данных для карточки товара.

Свойства:
- id: string (*уникальный идентификатор товара*)
- title: string (*название товара*)
- description: string (*описание товара, необязательное*)
- image: string (*URL изображения товара, необязательное*)
- category: Category (*категория товара, определенная в перечислении Category, необязательное*)
- price: number | null (*цена товара, может быть null если цена не определена*)
- buttonName: string (*название кнопки, необязательное*)


3. **ICardList (Интерфейс)**

Используется для описания списка карточек товаров.

Свойства:
- total: number (*общее количество товаров*)
- items: ICardItem[] (*массив элементов ICardItem*)


4. **IOrderContacts (Интерфейс)**

Содержит контактные данные для оформления заказа.

Свойства:
- email: string (*электронная почта покупателя*)
- phone: string (*телефонный номер покупателя*)


5. **IOrderPayments (Интерфейс)**

Описывает информацию о способе оплаты и адресе доставки для заказа.

Свойства:
- payment: string (*способ оплаты*)
- address: string (*адрес доставки*)


6. **IOrder (Интерфейс)**

Объединяет данные о контактах и платежах (расширяет интерфейсы IOrderContacts и IOrderPayments).

Свойства:
- total: number (*общая стоимость заказа*)
- items: string[] (*список идентификаторов товаров в заказе*)


7. **IOrderResult (Интерфейс)**

Описывает результат успешного оформления заказа.

Свойства:
- id: string (*идентификатор заказа*)
- total: number (*итоговая стоимость заказа*)



## Базовый код

1. **EventEmitter**

Управление событиями в приложении.

Функции:
- on: void (*установка обработчика события*)
- off: void (*снятие обработчика события*)
- trigger: void (*генерирует событие*)


2. **Component<T> (абстрактный базовый класс)**

Обеспечивает базовые методы для работы с DOM элементами (установка текста, изображений и классов).

Методы:
- setText: void (*устанавливает текстовое содержимое элемента*)
- setImage: void (*устанавливает изображение элемента*)
- setDisabled: void (*управляет атрибутом disabled элемента в зависимости от состояния*)


3. **Api**

Реализовывает методы:
- get: void (*для получения с сервера, принимающий параметр uri*)
- post: void (*для отправки данных на сервер, принимающий uri ссылку, объект данных и метод запроса*)
- handleResponse: void (*для обработки полученного ответа от сервера в методах get и post*)
Конструктор класса принимает базовый URL запроса, также опции запроса и присваивает их соответствующим параметрам объекта класса.



## View

2. **Page**

Управление основными элементами страницы и их интерактивностью.

Методы:
- set counter: void (*устанавливает количество товаров в корзине*)
- set catalog: void (*обновляет отображение списка товаров*)
- set locked: void (*блокирует/разблокирует страницу*)


3. **Card**

Отображение карточки товара, включая информацию о товаре и действия, такие как добавление в корзину.

Методы:
- render: void (*отображает информацию о товаре*)
- set buttonName: void (*устанавливает название кнопки на карточке*)


4. **Basket**

Управление отображением корзины, включая список товаров и итоговую стоимость.

Методы:
- set items: void (*обновляет список товаров в корзине*)
- set total: void (*устанавливает итоговую стоимость товаров в корзине*)


5. **Modal**

Управление модальными окнами, которые могут содержать различные типы контента, такие как формы или информацию.

Методы:
- open: void (*открывает модальное окно*)
- close: void (*закрывает модальное окно*)
- set content: void (*устанавливает содержимое модального окна*)


6. **Form<T>**

Управления формами, включая ввод данных и валидацию.

Методы:
- render: void (*обновляет состояние формы*)
- set valid: void (*управляет доступностью кнопки отправки формы*)


7. **OrderContactsForm**

Дочерний класс, расширяющий класс Form. Используется для обработки данных контактной информации.

Методы:
- render: void (*обновляет состояние формы*)
- setEmail: void (*устанавливает зачение эл.почты в поле формы*)
- setPhone: void (*устанавливает значение телефона в поле формы*)


8. **OrderPaymentsForm**

Дочерний класс, расширяющий класс Form. Используется для обработки данных платежной информации.

Методы:
- render: void (*обновляет состояние формы*)
- setPayment: void (*устанавливает способ оплаты в поле формы*)
- setAddress: void (*устанавливает адрес доставки в поле формы*)



## Model

1. **AppState**

Хранение состояния приложения, управление данными о товаре, корзине, заказе.

Методы:
- updateOrderField: void (*обновляет любое поле заказа*)
- setCatalog: void (*устанавливает и обновляет каталог товаров*)
- setOrder: void (*обработка и сохранение данных о текущем заказе*)
- addOrRemoveCardFromBasket: void (*добавляет или удаляет товар из корзины*)
- validateOrder: boolean (*валидация данных формы заказа*)



## Сервисный класс LarekApi

1. **LarekApi**

Взаимодействие с серверным API, загрузка данных о товарах и отправка заказов.

Методы:
- getCardList: Promise<ICardItem[]> (*загружает список товаров*)
- postOrder: Promise<IOrderResult> (*отправляет заказ на сервер*)



## Presenter

- Card Selection: Событие выбора карточки товара.
- Basket Update: Событие обновления корзины.
- Order Submission: Событие отправки заказа.