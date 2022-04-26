import { Publisher, Subjects, TicketCreatedEvent } from "@micro_project/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
