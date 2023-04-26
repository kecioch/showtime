const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Screening = require("../models/Screening");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");

const { transformAmount } = require("../services/TransformNumber");
const {
  checkSeatAvailability,
  getSeats,
} = require("../services/ScreeningValidation");
const { createDatetime } = require("../services/Datetime");

// BASIC URL /payment

router.get("/config", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const cart = req.body;
    // console.log("CART", cart);

    const screening = await Screening.findById(cart.screening._id)
      .populate("scheduledScreening")
      .populate({ path: "scheduledScreening", populate: { path: "cinema" } })
      .populate({
        path: "scheduledScreening",
        populate: { path: "cinema", populate: { path: "map.rows.type" } },
      });
    // console.log("SCREENING", screening);
    if (!screening)
      return res.status(400).send({
        message: "Screening existiert nicht",
      });

    // Get seats from screening
    let seats = getSeats(
      screening.scheduledScreening.cinema.map.rows,
      cart.tickets
    );
    if (seats.length <= 0)
      return res.status(400).send({
        message: "Sitzplatz existieren nicht",
      });
    console.log("SEATS", seats);

    // Check whether tickets are available
    const available = checkSeatAvailability(screening.bookedSeats, seats);
    if (!available)
      return res.status(400).send({
        message: "Sitzplatz wurde bereits gebucht",
      });

    // Sum up seat prices
    const prices = seats.reduce((acc, seat) => acc + seat.type.price, 0);
    // console.log("PRICES", prices);
    const amount = transformAmount(prices);
    console.log("AMOUNT", amount);

    // Create Order for seats
    // console.log("SEATS",seats);
    const order = new Order({
      screening: cart.screening,
      customer: cart.customer,
      seats,
    });
    const savedOrder = await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount,
      metadata: {
        // screening_id: cart.screening._id,
        order_id: savedOrder.id,
        // customer_name: cart.customer.name,
        // customer_mail: cart.customer.email,
      },
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: e.message,
    });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("POST /payment/webhook");
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_ENDPOINT_SECRET
      );

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object;
          const metadata = paymentIntentSucceeded.metadata;
          console.log("BEZAHLUNG ERFOLGREICH");

          // Get metadata from payment
          const { order_id } = metadata;
          const order = await Order.findById(order_id);
          console.log("METADATA", metadata);
          console.log("ORDER_ID", metadata.order_id);
          console.log("ORDER", order);

          const seats = order.seats;
          const customer = order.customer;
          const screening_id = order.screening;

          console.log(screening_id);
          console.log(customer);
          console.log(seats);

          // Get screening
          const screening = await Screening.findById(screening_id)
            .populate("scheduledScreening")
            .populate({
              path: "scheduledScreening",
              populate: { path: "cinema" },
            })
            .populate({
              path: "scheduledScreening",
              populate: { path: "movie" },
            });
          // console.log("SCREENING", screening);

          // Create Ticket
          const datetime = createDatetime(
            screening.date,
            screening.scheduledScreening.time
          );
          console.log("TICKET SEATS", seats);
          const ticket = new Ticket({ customer, datetime, seats, screening });
          ticket.save();

          // Add booked seats
          const bookedSeats = seats.map((seat) => ({
            col: seat.col,
            row: seat.row,
          }));
          screening.bookedSeats = [...screening.bookedSeats, ...bookedSeats];
          await screening.save();

          // Complete order
          order.completed = true;
          await order.save();
          // await Order.findByIdAndRemove(order_id);

          break;
        default:
        // console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 respond to acknowledge receipt of the event
      res.send();
    } catch (err) {
      console.log("WEBHOOK ERROR", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  }
);

module.exports = router;
