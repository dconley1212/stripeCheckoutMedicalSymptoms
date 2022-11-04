require("dotenv").config();
const path = require("path");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
const Your_Domain = "http://localhost:8080";
