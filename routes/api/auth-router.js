import express from "express";

import authController from "../../controllers/auth-controller.js";

import {
  authenticate,
  isEmptyBody,
  upload,
  resizeAvatar,
} from "../../middlwares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSigninScheme,
  userSignupSchema,
  userUpdateSubscriptionSchema,
  userEmailSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  upload.single("avatarURL"),
  isEmptyBody,
  validateBody(userSignupSchema),
  resizeAvatar,
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

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  isEmptyBody,
  resizeAvatar,
  authenticate,
  authController.updateAvatar
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.resendVerifyEmail
);

export default authRouter;
