const express = require("express");
const router = express.Router();

const { authorization } = require("../services/Authentication");
const {ROLES} = require("../constants");
const authStaffAdmin = authorization([ROLES.ADMIN, ROLES.STAFF]);
const auth = authorization();

const Ticket = require("../models/Ticket");
const User = require("../models/User");

// BASIC URL /tickets

router.get("/", auth, async (req, res) => {
  const user = req.user;
  console.log(`GET /tickets`);
  try {
    const userFound = await User.findOne({ email: user.email })
      .populate("tickets")
      .populate({ path: "tickets", populate: { path: "screening" } })
      .populate({ path: "tickets", populate: { path: "seats.type" } })
      .populate({
        path: "tickets",
        populate: {
          path: "screening",
          populate: { path: "scheduledScreening" },
        },
      })
      .populate({
        path: "tickets",
        populate: {
          path: "screening",
          populate: {
            path: "scheduledScreening",
            populate: { path: "cinema" },
          },
        },
      })
      .populate({
        path: "tickets",
        populate: {
          path: "screening",
          populate: { path: "scheduledScreening", populate: { path: "movie" } },
        },
      });

    res.status(200).json({ data: userFound.tickets });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/validate/:id", authStaffAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(`GET /tickets/${id}`);
  try {
    const ticket = await Ticket.findById(id)
      .populate("screening")
      .populate("seats.type")
      .populate({
        path: "screening",
        populate: { path: "scheduledScreening" },
      })
      .populate({
        path: "screening",
        populate: {
          path: "scheduledScreening",
          populate: {
            path: "movie",
          },
        },
      })
      .populate({
        path: "screening",
        populate: {
          path: "scheduledScreening",
          populate: {
            path: "cinema",
          },
        },
      });
    console.log("Ticket", ticket);
    if (!ticket) return res.sendStatus(400);

    res.status(200).json({ data: ticket });
  } catch (err) {
    res.sendStatus(400);
  }
});

router.patch("/validate/:id", authStaffAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(`POST /tickets/${id}`);
  try {
    const ticket = await Ticket.findById(id);
    console.log("Ticket", ticket);
    if (!ticket) return res.sendStatus(400);

    ticket.checked = true;
    const savedTicket = await ticket.save();

    res.status(200).json({ data: savedTicket });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
