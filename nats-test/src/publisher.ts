import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
}); // "stan" in official Doc(instance or client)

// @ts-ignore
stan.on("connect", async () => {
  console.log("Publisher connected");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.log(err);
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "connect",
  //   price: 20,
  // }); // must send in JSON

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
