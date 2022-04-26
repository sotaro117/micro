import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});
// 2nd arg stands for "client id"

// @ts-ignore
stan.on("connect", () => {
  console.log("Listener connected to NATS");

  // @ts-ignore
  stan.on("close", () => {
    console.log("NATS connection is closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  // subscription.on("message", (msg: Message) => {
  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(`Received event #${msg.getSequence()}, with data ${data}`);
  //   }

  //   msg.ack(); // declare that an event finishes
  // });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

// Note

// const options = stan
//   .subscriptionOptions()
//   .setManualAckMode(true) // "setManualAckMode" lets you handle events manually not automatically that is set by default
//   .setDeliverAllAvailable() // Necessary with "setDurableName" as well
//   .setDurableName("accounting-name");

// const subscription = stan.subscribe(
//   "ticket:created",
//   "orders-service-queue-group",
//   options
// );
// 1st arg is subscription name
// 2nd is "Queue group"
