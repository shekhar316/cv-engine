const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

exports.viewjobs = (req, res) => {
    const sql = `select * from jobs where status = 1`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("viewjobs", { jobData: result})
        }
    });
}

exports.lastDates = (req, res) => {
    const sql = `select last_date from jobs where status = 1`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("calender", { dates: result})
        }
    });
}

exports.viewjobbyid = (req, res) => {
    var id = req.params.id
    var sql = `select * from jobs where jobID = ${id}`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }else {
            res.render("viewJobById", { Data: result});
        }
    });
}