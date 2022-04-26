import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@micro_project/common";

import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      throw new BadRequestError("Invalid crendentials");
    }

    const passwordMatch = await Password.compare(
      exisitingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: exisitingUser.id,
        email: exisitingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store on session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(exisitingUser);
  }
);

export { router as signinRouter };
