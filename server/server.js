const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const port = process.env.PORT || 8000;
const router = express.Router();

const Data = require("./models/Exercise");

// MongoDB
const dbRoute = require("./config/keys").mongoURI;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "client/build")));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/putData", (req, res) => {
  let data = new Data();

  console.log(req.body);
  const { name, sets, reps } = req.body;

  if (!name || !sets || !reps) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.name = name;
  data.sets = sets;
  data.reps = reps;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
