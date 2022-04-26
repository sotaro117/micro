import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@micro_project/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
