const express = require("express");
const router = express.Router();

const { authorization } = require("../services/Authentication");
const { ROLES } = require("../constants");
const authAdmin = authorization(ROLES.ADMIN);

const SeatType = require("../models/SeatType");

// BASE URL /seattypes

router.get("/", async (req, res) => {
  const seatTypes = await SeatType.find();
  res.status(200).json({ data: seatTypes });
});

router.post("/", authAdmin, async (req, res) => {
  console.log("POST /seattypes");
  console.log(req.body);
  const body = req.body;

  try {
    const foundType = await SeatType.findOne({
      title: { $regex: new RegExp(`^${body.title}$`, "i") },
    });

    if (foundType)
      return res.status(400).json({
        message: "Es existiert bereits ein Sitzplatztyp mit dieser Bezeichnung",
      });

    const seatType = new SeatType(body);
    console.log(seatType);
    const savedSeatType = await seatType.save();
    res.status(200).json({ data: savedSeatType });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(`PUT /seattypes/${id}`);
  console.log(body);
  try {
    const foundType = await SeatType.findOne({
      title: { $regex: new RegExp(`^${body.title}$`, "i") },
    });

    if (foundType && foundType.id !== id)
      return res.status(400).json({
        message: "Es existiert bereits ein Sitzplatztyp mit dieser Bezeichnung",
      });

    const updatedType = await SeatType.findByIdAndUpdate(id, body);
    console.log("UPDATED", updatedType);
    res.status(200).json({ data: updatedType });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /seattypes/${id}`);

  try {
    const type = await SeatType.findOneAndDelete({ _id: id });
    res.status(200).json({ data: type });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
