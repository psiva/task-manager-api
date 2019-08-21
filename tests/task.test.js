const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");

const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  setUpDatabase
} = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test"
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.isCompleted).toEqual(false);
});

test("Should get all user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should not delete tasks of other user", async () => {
  const url = `/tasks/${taskOne._id}`;
  const response = await request(app)
    .delete(url)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
