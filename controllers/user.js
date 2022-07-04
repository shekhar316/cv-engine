const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");



exports.profile = (req, res) => {
    const id = req.session.userid;
    const sql = `select * from users where id = '${id}'`;
    db.con.query(sql, function (err, userData) {
        if (err) {
            console.log(err);
        } else {
            let date = new Date(userData[0].dob);
            userData[0].dob = date.toDateString();
            const userD = userData[0];
            res.render("profile", { user: userD })
        }
    });
}

exports.view = (req, res) => {
    const id = req.session.userid;
    const sql = `select * from applications where userid = '${id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            const final = result;
            final.forEach(function myFunction(i) {
                if (i.status == 0) {
                    i.status = "Applied";
                } else if (i.status == 1) {
                    i.status = "Selected"
                } else {
                    i.status = "Rejected"
                }
            })
            res.render("userDash", { userData: final })
        }
    });
}

exports.check = (req, res) => {
    const { xth, xiith, curr, last_date } = req.body;
    const userid = req.session.userid;
    if (new Date(last_date) >= Date.now()) {
        var sql = `select * from users where id = '${userid}'`;
        db.con.query(sql, function (err, result) {
            if (err) {
                res.send({
                    code: 400
                })
            } else {
                if (result[0].xth >= xth && result[0].xii >= xiith && result[0].curr >= curr) {
                    res.send({
                        code: 1000
                    })
                } else {
                    res.send({
                        code: 1600
                    })
                }
            }

        });
    }else{
        res.send({
            code: 1800
        })
    }
}

exports.apply = async (req, res) => {
    const jobid = req.params.jobid;
    const userid = req.session.userid;
    var sql = `INSERT INTO applications (jobid, userid, applyDate, status) VALUES ('${jobid}', '${userid}', NOW(), 0)`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.render("index", {
                alert: "yes",
                title: "Sorry..",
                text: "Something went wrong.",
                icon: "error",
            })
        } else {
            const mailOptions = {
                from: mail.fromEmail,
                to: req.session.email,
                subject: 'Application Received.',
                text: `Your application for JOBID = ${jobid} has been received succesfully. You will notified for the further process over this email. Please check your mail regularly.`,
            };
            mail.sendMail(mailOptions)
            res.render("index", {
                alert: "yes",
                title: "Applied.",
                text: "You have succesfully applied for the position.",
                icon: "success"
            })
        }

    });
}




exports.update = (req, res) => {
    const { address, city, state, pin, email, xth, xii, curr, resume} = req.body;
    // console.log(email);
    // console.log(pin);
    var sql = `UPDATE users SET address = '${address}', state = '${state}', pin = '${pin}', city = '${city}', xth = '${xth}', xii = '${xii}', curr = '${curr}', resume='${resume}' where email = '${email}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.render("index", {
                alert: "yes",
                title: "Sorry..",
                text: "Something went wrong.",
                icon: "error",
            })
        } else {
            console.log("1 record updated.");
            res.render("index", {
                alert: "yes",
                title: "Profile Updated.",
                text: "Your data is updated successfully.",
                icon: "success"
            })
        }

    });
}
