const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { TestScheduler } = require("jest");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "123!!!tree123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should sign up a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Goncalo",
      email: "goncalo@example.com",
      password: "fff12312",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});
