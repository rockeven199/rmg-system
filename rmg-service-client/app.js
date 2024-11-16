const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname) + "/css"));
app.set("views engine", "ejs");
app.set("views", path.resolve(__dirname) + "/views");

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  res.send("res");
});
app.listen(8800);
