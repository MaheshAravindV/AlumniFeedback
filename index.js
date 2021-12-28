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
  console.log(req.body);
  fs.appendFileSync(
    req.body.formtype + ".csv",
    req.body.row.toString() + "\n",
    (err) => {
      if (err) res.send(err).status(400);
    }
  );
  res.status(200).send("Success Entry added");
});

app.get("/recruiter-result", (req, res) =>
  res.status(200).sendFile("./recruiters-feedback.csv", { root: __dirname })
);

app.get("/parent-result", (req, res) =>
  res.status(200).sendFile("./parent-feedback.csv", { root: __dirname })
);

app.get("/graduate-result", (req, res) =>
  res.status(200).sendFile("./graduate-feedback.csv", { root: __dirname })
);

app.get("/course-result", (req, res) =>
  res.status(200).sendFile("./ces-feedback.csv", { root: __dirname })
);
