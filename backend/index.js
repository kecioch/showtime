require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
// app.use(bodyParser.raw({type: "*/*"}));
// app.use(bodyParser.json());
// app.use(express.raw({type: 'application/json'}));
// app.use(bodyParser.text({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// only use the raw bodyParser for webhooks
app.use((req, res, next) => {
  if (req.originalUrl === "/payment/webhook") next();
  else bodyParser.json()(req, res, next);
});

// ROUTES
app.use("/search", require("./routes/Search")); // TMDB API
app.use("/movies", require("./routes/Movies"));
app.use("/cinemas", require("./routes/Cinemas"));
app.use("/seattypes", require("./routes/SeatTypes"));
app.use("/screenings", require("./routes/Screenings"));
app.use("/authentication", require("./routes/Authentication"));
app.use("/payment", require("./routes/Payment"));

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("HELLO FROM BACKEND");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
