const express = require("express");
const app = express();
const MongoConnectionClient = require("mongodb").MongoClient;

MongoConnectionClient.connect("mongodb://localhost:27017")
  .then((client) => {
    console.log("Successfully connected to the DB!");

    app.use(express.json());

    app.listen(3000, () => {
      console.log("server started");
    });

    app.get("/todo", (req, res) => {
      client
        .db("todoDb")
        .collection("todos")
        .find()
        .toArray()
        .then((todos) => {
          res.send(todos);
        })
        .catch((err) => {
          console.error("Couldn't get a list of todos!" + err);
        });
    });

    app.post("/todo", (req, res) => {
      client
        .db("todoDb")
        .collection("todos")
        .insertOne(req.body)
        .then(() => {
          res.send("Successfully saved the record in MongoDB");
        })
        .catch((err) => {
          console.log("Couldn't save the todo" + err);
        });
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to the MongoDB! " + err);
  });
