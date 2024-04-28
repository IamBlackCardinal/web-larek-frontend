import {Component} from "../base/Component";
import {ensureElement } from "../../utils/utils";
import {EventEmitter} from "../base/Ivents";
import { IBasketView } from "../../types";

export class Basket extends Component<IBasketView> {
    protected _ul: HTMLElement;
    protected _orderButton: HTMLButtonElement;
    protected _basketCounter: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._ul = ensureElement<HTMLElement>('.basket__list', container);
        this._basketCounter = ensureElement<HTMLElement>('.basket__price', container);
        this._orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);

        if (this._orderButton) {
            this._orderButton.addEventListener('click', () => {
                events.emit('order:open');
            });
        }
    }

    set ul(items: HTMLElement[]) {
      this._ul.replaceChildren(...items);
    }

    set counter(value: number) {
      this.setText(this._basketCounter, String(`${value} синапсов`));
    }

    get orderButton(): HTMLButtonElement {
      return this._orderButton;
    }

    set orderButton(element: HTMLButtonElement) {
      this._orderButton = element;
    }

    makeButtonActive(value: boolean) {
      this.setDisabled(this._orderButton, value);
    }
}