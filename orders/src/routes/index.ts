import express, { Request, Response } from "express";
import { OrderStatus, requireAuth } from "@micro_project/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
    status: OrderStatus.Complete,
  }).populate("ticket");

  res.send({ orders });
});

export { router as indexOrderRouter };
