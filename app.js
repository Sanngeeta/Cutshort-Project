const express = require("express");
const router = require("./routes/router");
const cookie = require("cookie-parser");
const bodyparser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();


app.use(cookie());
app.use(bodyparser.json());


app.use(express.json());
app.use("/", router);



const server = app.listen(PORT, () => {
  console.log(`PORT NUMBER ${PORT} Listening!...`);
});

