const { urlencoded } = require("express");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Tasks route
app.use("/api/v1/tasks", tasks);

// Middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(notFound);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("Hello Task Manager");
});

const port = process.env.PORT || 5050;
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
