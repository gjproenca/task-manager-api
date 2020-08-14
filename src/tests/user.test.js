const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "123!!!tree123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Goncalo",
      email: "goncalo@example.com",
      password: "fff12312",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Goncalo",
      email: "goncalo@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("fff12312");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Assert that token in response matches user second token
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "mikeadwdw@example.com",
      password: "qwdqwree123",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Sould not get profile for unauthenthicated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert user has been deleted in database
  expect(await User.findById(userOneId)).toBeNull();
});

test("Should not delete account for unauthenticathed user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
