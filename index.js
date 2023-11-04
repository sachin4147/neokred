const express = require("express");
const app = express();
require("dotenv").config()
const connectDB = require("./config/db");
const cors=require("cors")
app.use(express.json({ extended: false }));
const {UserRoute}=require("./Routes/UserRoutes")

app.use(cors());
//connect to the database
connectDB()

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/users",UserRoute)



const PORT = process.env.PORT || 6060;

app.listen(PORT, () =>

  console.log(`🏎  ✔ Server started on port ${PORT} (/index.js)`)
);
