import { OrderCancelledEvent } from "@micro_project/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // Create and save a ticket
  const orderId = new mongoose.Types.ObjectId().toHexString();

  const ticket = Ticket.build({
    title: "concert",
    price: 88,
    userId: "asdf",
  });
  ticket.set({ orderId });
  await ticket.save();

  // Create the fake data
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it("updated the ticket, publishes an event, and acks the message", async () => {
  const { listener, ticket, data, msg, orderId } = await setup();

  await listener.onMessage(data, msg);

  const udpatedTicket = await Ticket.findById(ticket.id);
  expect(udpatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
