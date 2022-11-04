require("dotenv").config();
const path = require("path");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
// app.use(express.static("public"));
app.use(express.json());
const port = process.env.PORT 

const calculateOrderAmount = (items) =>{
    return 4400
}


app.post('/create-payment-intent', async (req, res) =>{
    const {items} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true;
        }
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})


app.listen(port, () =>{
console.log("Server is listening")
})