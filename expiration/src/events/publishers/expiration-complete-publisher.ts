import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@micro_project/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
