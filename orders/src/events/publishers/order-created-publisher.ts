import { Publisher, OrderCreatedEvent, Subjects } from "@micro_project/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
