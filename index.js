const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exp = require("constants");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require('cors');


app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL
).then(()=>console.log("DB Connection Successfull !"))
.catch((err)=>console.log(err));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/checkout",stripeRoute);




app.listen(5000,()=>{
    console.log("Backend Server is running")
})