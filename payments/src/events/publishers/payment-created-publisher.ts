import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@micro_project/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
