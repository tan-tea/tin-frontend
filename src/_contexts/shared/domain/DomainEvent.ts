import { UuidValueObject } from './value-object';

type DomainEventAttributes = any;

interface DomainEventPrimitives {
	aggregateId: string;
	eventId?: string;
	occurredOn?: Date;
	attributes: DomainEventAttributes;
}

export abstract class DomainEvent {
	static EVENT_NAME: string;
	static fromPrimitives: (params: DomainEventPrimitives) => DomainEvent;

	readonly aggregateId: string;
	readonly eventId: string;
	readonly occurredOn: Date;
	readonly eventName: string;

	constructor(
		params: { eventName: string } & Omit<
			DomainEventPrimitives,
			'attributes'
		>,
	) {
		const { aggregateId, eventId, occurredOn, eventName } = params;

		this.aggregateId = aggregateId;
		this.eventId = eventId || UuidValueObject.random().value;
		this.occurredOn = occurredOn || new Date();
		this.eventName = eventName;
	}

	abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
	EVENT_NAME: string;
	fromPrimitives(params: DomainEventPrimitives): DomainEvent;
};
