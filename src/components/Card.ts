import { Component } from "./base/Component";
import { ICardItem, ICardActions, IPreviewCard } from "../types";
import { ensureElement } from "../utils/utils";

export class Card extends Component<ICardItem> {
  protected _id: string;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;

  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
      super(container);

      this._category = ensureElement<HTMLElement>(`.card__category`, container);
      this._title = ensureElement<HTMLElement>(`.card__title`, container);
      this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
      this._price = ensureElement<HTMLElement>(`.card__price`, container);

      if (actions?.onClick) {
          container.addEventListener('click', actions.onClick);
      }
  }

  set id(value: string) {
      this.container.dataset.id = value;
  }

  get id(): string {
      return this.container.dataset.id || '';
  }

  set title(value: string) {
      this.setText(this._title, value);
  }

  get title(): string {
      return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  get image(): string {
    return this._image.src || '' && this._image.alt || '';
  }

  set category(value: string) {
    this.setText(this._category, value);
    if (value === "софт-скил") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_soft')
    } else if (value === "другое") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_other')
    } else if (value === "дополнительное") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_additional')
    } else if (value === "кнопка") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_button')
    } else if (value === "хард-скил") {
      this._category.className = 'card__category'
      this._category.classList.add('card__category_hard')
    }
  }

  get category(): string {
    return this._category.textContent || '';
  }

  set price(value: number | null) {
    if (typeof value === "number") {
      this.setText(this._price, `${value} синапсов`);
    } else {
      this.setText(this._price, `Бесценно`);
    }
  }
}

//каталожная карточка
export class CatalogCard extends Card implements ICardItem {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }
}

//превью карточки
export class PreviewCard extends Card implements IPreviewCard {
  protected _description: HTMLElement;
  protected _buyButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
    this._description = ensureElement<HTMLElement>('.card__text',container);
    this._buyButton = ensureElement<HTMLButtonElement>('.card__button', container);
    
    if (actions?.onClick) {
      container.removeEventListener('click', actions.onClick);
      this._buyButton.addEventListener('click', actions.onClick);
    }
  }

  set description(value: HTMLElement) {
    this.setText(this._description, value)
  }

  get buyButton(): HTMLButtonElement {
    return this._buyButton;
  }

  set buyButton(value: HTMLButtonElement) {
    this.setText(this._buyButton, value)
  }

  markPriceless() {
    this.setText(this._buyButton, "Недоступно для покупки");
    this.setDisabled(this._buyButton, true);
  }

  markAdded() {
    this.setText(this._buyButton, "Уже в корзине");
    this.setDisabled(this._buyButton, true);
  }
}

//карточка корзины
export class BasketItem extends Component<ICardItem> {
  protected _itemIndex: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _basketDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._itemIndex = ensureElement<HTMLElement>('.basket__item-index', container);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._basketDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    if (actions?.onClick) {
      this._basketDeleteButton.addEventListener('click', actions.onClick);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price (value: number | null) {
    if (typeof value === "number") {
      this.setText(this._price, `${value} синапсов`);
    } else {
      this.setText(this._price, "Бесценно");
    }
  }

  set itemIndex(value: number) {
    this.setText(this._itemIndex, value);
  }
}