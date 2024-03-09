const express = require("express");
const app = express();
const cors = require("cors"); // Import cors module separately
const port = 3333;
const path = require("path");

app.use(cors()); // Use cors middleware before express.json()
app.use(express.json());

app.use("/route", require("./route")); // providing route for authentication

app.listen(port, () => {
  console.log(`My CRUD App is listening on port http://localhost:${port}`);
});
