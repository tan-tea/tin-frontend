import { DependencyContainer } from 'tsyringe';

import { DomainEvent } from 'contexts/shared/domain/DomainEvent';
import { DomainEventSubscriber } from 'contexts/shared/domain/DomainEventSubscriber';

export class DomainEventSubscribers {
	constructor(
		public readonly items: Array<DomainEventSubscriber<DomainEvent>>,
	) {}

	static from(container: DependencyContainer): DomainEventSubscribers {
		const subscribers = container.resolveAll<
			DomainEventSubscriber<DomainEvent>
		>('DomainEventSubscriber');
		return new DomainEventSubscribers(subscribers);
	}
}
