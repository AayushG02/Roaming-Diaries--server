require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/auth/", userRoutes);
app.use("/blog/", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
