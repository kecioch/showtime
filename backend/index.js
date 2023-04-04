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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/search", require("./routes/Search")); // TMDB API
app.use("/movies", require("./routes/Movies"));
app.use("/cinemas", require("./routes/Cinemas"));

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("HELLO FROM BACKEND");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
