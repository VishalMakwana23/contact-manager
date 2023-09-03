const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
var cors = require("cors");

connectDb();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server running on port : ${port}`);
});
