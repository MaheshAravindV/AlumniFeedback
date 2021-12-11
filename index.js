const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static("frontend"));
app.use(express.json());
if (false /* Make true if in dev */) process.env.PORT = 3000;
app.listen(process.env.PORT);

app.post("", (req, res) => {
  fs.appendFileSync("data.csv", req.body.row.toString() + "\n", (err) => {
    if (err) res.send(err).status(400);
  });
  res.status(200).send("Success Entry added");
});

app.get("/results", (req, res) =>
  res.status(200).sendFile("./data.csv", { root: __dirname })
);
