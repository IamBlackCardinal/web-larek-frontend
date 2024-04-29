import { Form } from './common/Form';
import { IEvents } from './base/Events';
import { IOrderPayments } from '../types';

export class OrderPayments extends Form<IOrderPayments> {
	protected _paymentButton: HTMLButtonElement[];
	protected _changeButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentButton = Array.from(container.querySelectorAll('.button_alt'));
		this._paymentButton.forEach((button) => {
			button.addEventListener('click', () => {
				events.emit('paymentMethod:changed', button);
			});
		});

		this._changeButton = container.querySelector('.order__button');

		this._changeButton.addEventListener('click', () => {
			events.emit('contacts:open');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	setPaymentButton(name: string): void {
		this._paymentButton.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}
}
