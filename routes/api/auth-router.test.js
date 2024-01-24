import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test /api/auth/singup", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connect.close();
    server.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signin with correct data", async () => {
    const signupData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };

    await request(app).post("/api/auth/signup").send(signupData);

    const signinData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };
    const { statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(statusCode).tobe(200);
  });

  test("test signin with correct token", async () => {
    const signupData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };

    await request(app).post("/api/auth/signup").send(signupData);

    const signinData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };

    const { body } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(body.token).toBeDefined();
  });

  test("test signin with correct email response", async () => {
    const signupData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };

    await request(app).post("/api/auth/signup").send(signupData);

    const signinData = {
      email: "tamtam123@gmail.com",
      password: "mokrok00201",
    };

    const user = await User.findOne({ email: signinData.email });
    expect(user.email).toBe(signinData.email);
  });
});
