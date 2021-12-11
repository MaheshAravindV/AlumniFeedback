const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT);

app.post("", (req, res) => {
  fs.appendFileSync("data.csv", req.body.row.toString() + "\n", (err) => {
    if (err) res.send(err).status(400);
  });
  res.status(200).send("Success Entry added");
});

app.get("", (req, res) => {
  res.send("Use POST method and send the data in body as JSON");
});

app.get("/results", (req, res) =>
  res.status(200).sendFile("./data.csv", { root: __dirname })
);
