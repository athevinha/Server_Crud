const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const db = require("./models");
const Tutorial = db.tutorials;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect database");
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.post("/api/tutorials/create", async (req, res) => {
  let tutorials = new Tutorial(req.body);
  try {
    await tutorials.save();
    res.send(tutorials);
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/tutorials/read", async (req, res) => {
  Tutorial.find({}, (err, dataBase) => {
    if (err) {
      console.log(err);
    }
    res.send(dataBase);
  });
});

app.delete("/api/tutorials/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req);
  Tutorial.findByIdAndDelete(id, (err, txt) => {
    try {
      res.send(txt);
    } catch (err) {
      console.log(err);
    }
  });
});
app.put("/api/tutorials/update/:id", async (req, res) => {
  const newData = req.body;
  const _id = req.params.id;
  console.log(newData);
  console.log(_id);
  res.send("Updated: " + _id);
  try {
    await Tutorial.findById(_id, (err, Tutorial) => {
      Tutorial.title = newData.title;
      Tutorial.description = newData.description;
      Tutorial.save();
    });
  } catch (err) {
    console.log(err);
  }
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
