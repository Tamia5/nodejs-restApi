import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlwares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSigninScheme,
  userSignupSchema,
  userUpdateSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninScheme),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/",
  isEmptyBody,
  authenticate,
  validateBody(userUpdateSubscriptionSchema),
  authController.updateSubscription
);

export default authRouter;
