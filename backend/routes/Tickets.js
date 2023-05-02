const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");

// BASIC URL /tickets

router.get("/", async (req, res) => {
  console.log("GET /tickets");
  try {
    const tickets = await Ticket.find();
    res.send(tickets);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.get("/:cust_mail", async (req, res) => {
  const { cust_mail } = req.params;
  console.log(`GET /tickets/${cust_mail}`);
  try {
    const tickets = await Ticket.find({ "customer.email": cust_mail })
      .populate("screening")
      .populate("seats.type")
      .populate({ path: "screening", populate: { path: "scheduledScreening" } })
      .populate({
        path: "screening",
        populate: { path: "scheduledScreening", populate: { path: "cinema" } },
      })
      .populate({
        path: "screening",
        populate: { path: "scheduledScreening", populate: { path: "movie" } },
      });
    res.send(tickets);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/validate/:id", async (req, res) => {
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

    res.send(ticket);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.patch("/validate/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`POST /tickets/${id}`);
  try {
    const ticket = await Ticket.findById(id);
    console.log("Ticket", ticket);
    if (!ticket) return res.sendStatus(400);

    ticket.checked = true;
    const savedTicket = await ticket.save();

    res.send(savedTicket);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
