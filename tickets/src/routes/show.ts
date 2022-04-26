import express, { Request, Response } from "express";
import { NotFoundError } from "@micro_project/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }
});

export { router as showTicketRouter };
