const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const {con} = require("../utils/db");
const sessions = require("express-session")
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.isLoggedIn = (req, res, next) => {
    if(req.session.email){
        return next()
    }else{
        res.redirect("/auth/login");
    }
}

exports.isAdmin = (req, res, next) => {
    if(req.session.role && (req.session.role < 1)){
        res.render("index", {
            alert: "yes",
            title: "Sorry",
            text: "You are not a admin.",
            icon: "error",})
    }else {
        return next();
    }
}



exports.register = (req, res) => {
    res.render("register", {alert: "no"})
}

exports.login = (req, res) => {
    res.render("login", {alert: "no"})
}

exports.signup = async (req, res) => {
    const {fname, lname, password, dob, gender, email, phone, city, address, state, pin, xth, xii, curr, resume} = req.body;
    var encrypass = await bcrypt.hash(password, saltRounds);

    var sql = `INSERT INTO users (first_name, last_name, password, gender, dob, email, phone, address, city, state, pin, role, xth, xii, curr, resume) VALUES ('${fname}', '${lname}', '${encrypass}', '${gender}', '${dob}', '${email}', '${phone}', '${address}', '${city}', '${state}', '${pin}', 0, '${xth}', '${xii}', '${curr}', '${resume}')`;
    db.con.query(sql, function (err, result) {
        if(err){
            console.log(err);
            if(err.code == 'ER_DUP_ENTRY'){
                res.render("register", {
                    alert: "yes",
                    title: "Email Already Exists...",
                    text: "Please use a different email address.",
                    icon: "error",})
            }else{
                res.render("register", {
                    alert: "yes",
                    title: "Sorry..",
                    text: "Something went wrong.",
                    icon: "error",})
            }
        }else {
            console.log("1 record inserted");
            res.render("login", {
                alert: "yes",
                title: "Registration Successful.",
                text: "Please login to continue.",
                icon: "success"})
        }

    });
};

exports.signin = async (req, res) => {
    const {password, email} = req.body;
    var sql = `SELECT * from users WHERE email = '${email}'`;
    db.con.query(sql, async function (err, result) {
        if (err) {
            console.log(err);
            res.render("login", {
                alert: "yes",
                title: "Sorry",
                text: "Something went wrong.",
                icon: "error",
            })
        } else {
            if (result.length > 0) {
                var check = await bcrypt.compare(password, result[0].password)
                console.log(check)
                if (check) {
                    var session = req.session;
                    session.userid = result[0].id;
                    session.email = result[0].email;
                    session.name = result[0].first_name + ' ' + result[0].last_name;
                    session.phone = result[0].phone;
                    session.role = result[0].role;
                    console.log("Logged In.");
                    res.redirect("/");
                } else {
                    res.render("login", {
                        alert: "yes",
                        title: "Oops",
                        text: "Wrong password.",
                        icon: "error"
                    })
                }
            } else {
                res.render("login", {
                    alert: "yes",
                    title: "Oops",
                    text: "User does not exist.",
                    icon: "error"
                })
            }
        }

    });
};


exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}