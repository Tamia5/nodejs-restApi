import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const subscriptionType = ["starter", "pro", "business"];
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionType,
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().validate(...subscriptionType),
});

export const userSigninScheme = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const User = model("user", userSchema);

export default User;
