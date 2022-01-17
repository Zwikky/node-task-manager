const { urlencoded } = require("express");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.static("./public"));

// Tasks route
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Hello Task Manager");
});

// app.get('/api/v1/tasks')          - get all the tasks
// app.post('/api/v1/tasks')         - create a new task
// app.get('/api/v1/tasks/:id')      - get single tasks
// app.patch('/api/v1/tasks/:id')    - update task
// app.delete('/api/v1/tasks/:id')   - delete task

const port = 5050;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port:${port}......`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
