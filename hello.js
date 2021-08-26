const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
const mongoose = require("mongoose");
const Tutorial = require("./models/tutorial.model.js");
mongoose
  .connect(
    "mongodb+srv://cruh:crud@cluster0.wtjvy.mongodb.net/crud?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connect database");
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

app.post("/create", async (req, res) => {
  data = {
    title: "vinh",
    description: "hello em yeus",
    publish: true,
  };
  let tutorials = new Tutorial(data);
  try {
    await tutorials.save();
    res.send(tutorials);
    console.log("create data ok");
  } catch (e) {
    console.log(e);
  }
});

app.get("/read", async (req, res) => {
  Tutorial.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
