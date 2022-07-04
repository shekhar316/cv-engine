require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require('mysql2');
const path = require('path');
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const sessions = require("express-session")
const db = require("./utils/db.js");
const mail = require("./utils/mail.js");


// App Configuration
const app = express()
const port = process.env.PORT || 3000


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload())
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "theBookTown",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.all('*', checkUser);
function checkUser(req, res, next) {
    res.locals.id = req.session.userid;
    res.locals.email = req.session.email;
    res.locals.phone = req.session.phone;
    res.locals.name = req.session.name;
    res.locals.role = req.session.role;
    next();
}


// DB Connection
db.dbConnect();

// Routes
const authRoutes = require("./routes/auth");
// const staticRoutes = require("./routes/static");
const jobRoutes = require("./routes/job");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const archivesRoutes = require("./routes/archives");
const fileUpload = require("express-fileupload");
const {con} = require("./utils/db");
const noticeRoutes = require("./routes/notice");


// //My Routes
app.use("/auth", authRoutes);
// app.use("/", staticRoutes);
app.use("/job", jobRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/archives", archivesRoutes);
app.use("/notice", noticeRoutes);


// Starting a server
app.listen(port, () => {
    console.log(`The BookTown is listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.render("index", {alert: "no", loginStatus: req.session.email})
})

app.get('/about', (req, res) => {
    res.render("about", {alert: "no", loginStatus: req.session.email})
})

app.get('/contact', (req, res) => {
    res.render("contact", {alert: "no", loginStatus: req.session.email})
})