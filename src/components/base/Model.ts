import { IEvents } from './Events';

// Гарда для проверки на модель
export const isModel = <T>(obj: unknown): obj is Model<T> => {
	return obj instanceof Model;
};

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Сообщить всем что модель поменялась
	emitChanges(event: string, payload?: object) {
		// Состав данных можно модифицировать
		this.events.emit(event, payload ?? {});
	}

	// далее можно добавить общие методы для моделей
}
