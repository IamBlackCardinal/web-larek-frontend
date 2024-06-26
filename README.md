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


Проект выполнен путем использования паттерна MVP и  имеет три слоя: Presenter, Model и View. Роль слоя Presenter выполнятся файлом index.ts , в котором осуществляется взаимодействие между слоями Model и View. 

## Основные типы данных

1. **ICardItem (Интерфейс)**  
Описывает структуру данных для карточки товара.  
Свойства:
   - id: string (*уникальный идентификатор товара*)
   - title: string (*название товара*)
   - description: string (*описание товара, необязательное*)
   - image: string (*URL изображения товара, необязательное*)
   - category: Category (*категория товара, определенная в перечислении Category, необязательное*)
   - price: number | null (*цена товара, может быть null если цена не определена*)
   - itemIndex?: number (*колво товара, необязательное*)


2. **IOrderContacts (Интерфейс)**  
Содержит контактные данные для оформления заказа.  
Свойства:
   - email: string (*электронная почта покупателя*)
   - phone: string (*телефонный номер покупателя*)


3. **IOrderPayments (Интерфейс)**  
Описывает информацию о способе оплаты и адресе доставки для заказа.  
Свойства:
   - payment: string (*способ оплаты*)
   - address: string (*адрес доставки*)


4. **IOrder (Интерфейс)**  
Объединяет данные о контактах и платежах (расширяет интерфейсы IOrderContacts и IOrderPayments).  
Свойства:
   - total: number (*общая стоимость заказа*)
   - items: string[] (*список идентификаторов товаров в заказе*)


5. **IOrderResult (Интерфейс)**  
Описывает результат успешного оформления заказа.  
Свойства:
   - id: string (*идентификатор заказа*)
   - total: number (*итоговая стоимость заказа*)


6. **IPreviewCard (Интерфейс)**  
Превью карточки  
   - description: HTMLElement;
   - buyButton: HTMLButtonElement;


7. **IAppState (Интерфейс)**  
состояние приложения  
   - catalog: ICardItem[];
   - order: IOrder | null;
   - preview: string | null;


8. **ICardActions (Интерфейс)**  
действия карточек  
   - onClick: (event: MouseEvent) => void;


9. **IBasketState (Интерфейс)**  
состояние корзины  
   - basketArray: ICardItem[];


10. **IBasketView (Интерфейс)**  
корзина  
   - ul: HTMLElement[];
   - counter: number;


11. **IModalData (Интерфейс)**  
модальное окно  
   - content: HTMLElement;


12. **ISuccessPage (Интерфейс)**  
страница успеха  
   - onClick: (event: MouseEvent) => void;
   - counter?: number;


13. **IFormState (Интерфейс)**  
состояние формы  
   - valid: boolean;
   - errors: string[];


14. **ICatalog (Интерфейс)**  
каталог  
   - counter: number;
   - catalog: HTMLElement[];
   - wrapper: HTMLElement;
   - basket: HTMLElement;
   - locked: boolean;



## Базовый код

1. **EventEmitter**  
Управление событиями в приложении.  
Функции:
   - on: void (*установка обработчика события*)
   - off: void (*снятие обработчика события*)
   - emit: void (*вызов всех обработчиков события*)
   - onAll: void (*установка обработчика на все события*)
   - offAll: void (*снятие всех обработчиков событий*)
   - trigger: void (*генерирует событие*)


2. **Component<T> (абстрактный базовый класс)**  
Обеспечивает базовые методы для работы с DOM элементами (установка текста, изображений и классов).  
Методы:
   - toggleClass: void (*переключение класса*)
   - setText: void (*устанавливает текстовое содержимое элемента*)
   - setImage: void (*устанавливает изображение элемента*)
   - setDisabled: void (*управляет атрибутом disabled элемента в зависимости от состояния*)
   - setHidden: void (*скрывает элемент*)
   - setVisible: void (*отображает элемент*)
   - render: void (*возвращает корневой DOM-элемент*)


3. **Api**  
Реализовывает методы:
   - get: void (*для получения с сервера, принимающий параметр uri*)
   - post: void (*для отправки данных на сервер, принимающий uri ссылку, объект данных и метод запроса*)
   - handleResponse: void (*для обработки полученного ответа от сервера в методах get и post*)  
Конструктор класса принимает базовый URL запроса, также опции запроса и присваивает их соответствующим параметрам объекта класса.


4. **Model<T>**  
Обобщенный базовый класс для моделей данных в приложении. Этот класс предоставляет универсальные методы для управления и оповещения об изменениях в данных модели.  
Реализовывает методы:  
   - emitChanges: void (*для излучения событий, когда состояние модели изменяется. Позволяет подписчикам событий реагировать на изменения в модели*)  
Конструктор класса принимает:  
   - data: Partial<T> (*инициализирует модель частичными данными типа T. Это позволяет создавать экземпляр модели с неполным набором полей типа*)  
   - events: IEvents (*сервис для управления событиями, который позволяет модели излучать события о своих изменениях*)



## View

1. **Page**  
Управление основными элементами страницы и их интерактивностью.  
Методы:
   - set counter: void (*устанавливает количество товаров в корзине*)
   - set catalog: void (*обновляет отображение списка товаров*)
   - set locked: void (*блокирует/разблокирует страницу*)


2. **Card**  
Базовый класс для всех карточек  
Методы:
   - set id: void (*устанавливает свойство id*)
   - get id: void (*получает свойство id*)
   - set title: void (*устанавливает свойство наименование*)
   - get title: void (*получает свойство наименование*)
   - set image: void (*устанавливает свойство изображение*)
   - get image: void (*получает свойство изображение*)
   - set category: void (*устанавливает свойство категория*)
   - get category: void (*получает свойство категория*)
   - set price: void (*устанавливает свойство цена*)


**CatalogCard**  
Класс карточки каталога, унаследованный от `Card`.  
На его основе создается экземпляр каждой карточки каталога.


**PreviewCard**  
Класс карточки для отображения превью в модальном окне, унаследованный от `Card`.  
Методы:
   - set description: void (*описание товара*)
   - get buyButton: void (*кнопка покупки*)
   - set buyButton: void (*кнопка покупки*)
   - markPriceless: void (*изменяет текст кнопки на "Недоступно для приобретения" и делает ее неактивной*)
   - markAdded: void (*изменяет текст кнопки на "Уже в корзине" и делает ее неактивной*)


**BasketItem**  
Класс карточки для отображения отдельного товара в модальном окне.  
Методы:
   - set title: void (*установка наименования товара*)
   - set price: void (*установка цены товара*)
   - set itemIndex: void (*установка значения счетчика*)


3. **Basket**  
Управление отображением корзины, включая список товаров и итоговую стоимость.  
Методы:
   - set items: void (*обновляет список товаров в корзине*)
   - set counter: void (*устанавливает итоговую стоимость товаров в корзине*)
   - makeButtonActive: void (*управляет активностью кнопки*)


4. **Modal**  
Управление модальными окнами, которые могут содержать различные типы контента, такие как формы или информацию.  
Методы:
   - open: void (*открывает модальное окно*)
   - close: void (*закрывает модальное окно*)
   - render: void (*устанавливает содержимое модального окна*)


5. **Form<T>**  
Управление формами, включая ввод данных и валидацию.  
Методы:
   - render: void (*обновляет состояние формы*)
   - set valid: void (*управляет доступностью кнопки отправки формы*)
   - onInputChange: void (*для эмитирования событий*)
   - set errors: void (*вывод сведений об ошибке*)


6. **OrderContacts**  
Дочерний класс, расширяющий класс Form. Используется для обработки данных контактной информации.  
Методы:
   - setEmail: void (*устанавливает зачение эл.почты в поле формы*)
   - setPhone: void (*устанавливает значение телефона в поле формы*)


7. **OrderPayments**  
Дочерний класс, расширяющий класс Form. Используется для обработки данных платежной информации.  
Методы:
   - setPaymentButton: void (*устанавливает активное состояние кнопок способа оплаты в поле формы*)
   - setAddress: void (*устанавливает адрес доставки в поле формы*)


8. **Success**  
Отображение сообщения об успешном завершении заказа.
Методы:  
   - set counter: void (*устанавливает количество списанных синапсов*)
   - set successButton: void (*установка кнопки закрытия успешного заказа*)



## Model

1. **AppState**  
Хранение состояния приложения, управление данными о товаре, корзине, заказе.  
Методы:
   - setPreview: void (*установка предпросмотра выбранного элемента*)
   - setOrderField: void (*установка поля заказа*)
   - setPaymentMethod: void (*установка метода оплаты*)
   - validateOrder: void (*проверяет форму оплаты на наличие ошибок и генерирует соответствующие события*)


**BasketState**  
Состояние корзины  
Методы:
   - addToBasket: void (*добавляет элемент в корзину*)
   - removeFromBasket: void (*удаляет элемент из корзины*)
   - clearBasket: void (*очищает корзину*)
   - total: number (*вычисляет итоговую стоимость товаров в корзине*)



## Сервисный класс LarekApi

1. **LarekApi**  
Взаимодействие с серверным API, загрузка данных о товарах и отправка заказов.  
Методы:
   - getCard: Promise<ICardItem> (*получает данные о товаре*)
   - getCardList: Promise<ICardItem[]> (*получает список товаров*)
   - postOrder: Promise<IOrderResult> (*отправляет заказ на сервер*)



## Presenter

- items:change (*изменениее массива товаров*)
- card:select (*выбирает карточку по клику*)
- preview:changed (*получает данные товара по id, открывает модальное окно с карточкой этого товара*)
- item:add (*добавляет данные конкретного товара в корзину*)
- item:remove (*удаляет товар и данные о нем*)
- modal:open (*открывает модальное окно, включает блокировку прокрутки при открытом модальном окне*)
- modal:close (*закрывает модальное окно, отключает блокировку прокрутки*)
- order:open (*открывает модальное окно на первой вкладке оформления заказа*)
- contacts:open (*открывает модельное окно на второй вкладке оформления заказа)
- contacts:submit (*сообщение об успешном выполнении заказа*)
- basket:open (*открытие корзины*)
- basketData:changed (*изменение содержимого корзины*)
- paymentMethod:changed (*выбор способа оплаты*)
- formErrors:change (*изменение ошибок в форме*)
- /^contacts\..*:change/ (*изменение значения поля в форме контактных данных*)
- /^order\..*:change/ (*изменение значения поля в форме оформления заказа*)