require("dotenv").config();
// const path = require("path");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const calculateOrderAmount = (items) => {
  let totalCost = 0;
  items.forEach(
    (item) => (totalCost = parseInt(item.price.toString().split(".").join("")))
  );
  return totalCost;
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      custom: "Something went wrong",
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
