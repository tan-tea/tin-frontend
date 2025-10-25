import { DomainEvent } from './DomainEvent';

export interface EventBus {
	publish(events: Array<DomainEvent>): Promise<void>;
	addSubscribers(subscribers: any): void;
}
