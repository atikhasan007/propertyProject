import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import userRoutes from "./routes/user.js";

import bookingRoutes from "./routes/booking.js";



const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


 
//Routes
app.use("/auth",authRoutes)
app.use("/listing", listingRoutes);
app.use("/bookings", bookingRoutes)
app.use("/users",userRoutes)






const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log('Database is connect successfully')
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>console.log(error))