import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const mongoDBUri = process.env.mongoDBUri;
const DBNAME = process.env.DBNAME;
import mongoose from "mongoose";
import cors from "cors";

import product from "./Routes/products.js";
import user from "./Routes/users.js";
import isAuth from "./Middleware/auth.js";

const app = express();

// Middleware for CORS
app.use(cors());

app.use("/product", product);
app.use("/users", user);
app.use(isAuth);

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DBNAME,
    });
    console.log("Express app connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

connectToMongoDB();
