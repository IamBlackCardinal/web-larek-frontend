import { ISuccessPage } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

export class Success extends Component<ISuccessPage> {
	protected _counter: HTMLElement;
	protected _successButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ISuccessPage) {
		super(container);

		this._counter = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);
		this._successButton = ensureElement<HTMLButtonElement>(
			'.button',
			container
		);
		if (actions?.onClick) {
			this._successButton.addEventListener('click', actions.onClick);
		}
	}

	set counter(value: number) {
		this.setText(this._counter, `Списано ${value} синапсов`);
	}

	get successButton(): HTMLButtonElement {
		return this._successButton;
	}

	set successButton(element: HTMLButtonElement) {
		this._successButton = element;
	}
}
