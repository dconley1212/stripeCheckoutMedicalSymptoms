require("dotenv").config();
const path = require("path");
const cors = require('cors')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
// app.use(express.static("public"));
app.use(express.json());
app.use(cors());
const port = process.env.PORT 

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
}

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