import { Form } from "./common/Form";
import { IEvents } from "./base/Ivents";
import { IOrderContacts } from "../types";

export class OrderContacts extends Form<IOrderContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}