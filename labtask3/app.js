const express = require("express");
const connectDB = require('./db');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(express.static("public"));
const microwaveRouter = require('./routes/microwaves'); 
const refrigeratorsRouter = require('./routes/refrigerators');
const isAdmin = require('./middlewares/admin');


module.exports = app;

app.use((req, res, next) => {
  // res.send("site is down for maintenance");
  console.log(req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Specify the 'extended' option

app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(require("./middlewares/checkSession"));
app.use('/microwaves', microwaveRouter);
app.use('/refrigerators', refrigeratorsRouter);
app.use('/refrigerators', isAdmin, refrigeratorsRouter);

app.set("view engine", "ejs");

app.use("/", require("./routes/auth"));

app.get("/cookie-test", (req, res) => {
  let visit = req.cookies["page-visits"];
  if (!visit) visit = 1;
  else visit = Number(visit) + 1;
  res.cookie("page-visits", visit);
  return res.send("You Visited: " + visit + " Times");
});

app.get("/", (req, res) => {
  res.render("homepage");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(4000, () => {
  console.log("Server Started");
});

const mongoose = require("mongoose");
// Connect to the database
connectDB()
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
