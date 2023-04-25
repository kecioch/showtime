const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// BASIC URL /payment

router.get("/config", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      metadata: {
        tickets: "coole Tickets"
      },  
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    console.log("POST /payment/webhook");
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
      console.log("WEBHOOK ERROR", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log("CHECK EVENT TYPE");
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log("BEZAHLUNG ERFOLGREICH",paymentIntentSucceeded.metadata);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 respond to acknowledge receipt of the event
    res.send();
  }
);

module.exports = router;
