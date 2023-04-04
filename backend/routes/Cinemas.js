const express = require("express");
const router = express.Router();

const Cinema = require("../models/Cinema");

// BASE URL /cinemas

router.get("/", async (req,res) => {
    const cinemas = await Cinema.find();
    res.send(cinemas);
});

router.post("/", async (req, res) => {
    console.log("POST /cinemas");
    console.log(req.body);
    const body = req.body;

    try {
      const cinema = new Cinema(body);
      console.log(cinema);
      const savedCinema = await cinema.save();
      res.status(200).json(savedCinema);
    } catch (err) {
      console.log(err);
      res.status(400).json({ code: 400, message: err.message });
    }
});



module.exports = router;