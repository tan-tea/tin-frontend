import { EventEmitter } from 'node:events';

import { EventBus } from 'contexts/shared/domain/EventBus';
import { DomainEvent } from 'contexts/shared/domain/DomainEvent';

import { DomainEventSubscribers } from './DomainEventSubscribers';

export class InMemoryEventBus extends EventEmitter implements EventBus {
	async publish(events: Array<DomainEvent>): Promise<void> {
		events.forEach((event) => this.emit(event.eventName, event));
	}

	addSubscribers(subscribers: DomainEventSubscribers): void {
		subscribers.items.forEach((subscriber) => {
			subscriber.subscribedTo().forEach((event) => {
				this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
			});
		});
	}
}
