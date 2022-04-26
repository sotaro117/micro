import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

import { OrderCreatedListener } from "./events/listener/order-created-listener";
import { OrderCancelledListener } from "./events/listener/order-cancelled-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be provided");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be provided");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be provided");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be provided");
  }
  try {
    await natsWrapper.connect("ticketing", "abcd", "http://nats-srv:4222"); // refer to K8s settings
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("Litening on port 3000");
});

start();
