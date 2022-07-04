const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const ejs = require("ejs")
const res = require("express");

const bcrypt = require("bcrypt");

exports.addjobget = (req, res) => {
    res.render("addjob");
}


exports.addjob = (req, res) => {
    const { title, description, last_date, min_curr, min_xth, min_xiith, company} = req.body;
    var uid = uuidv4();


    var sql = `INSERT INTO jobs (identifier, title, description, last_date, company, min_xth, min_xii, min_curr) VALUES ('${uid}', '${title}', '${description}', '${last_date}', '${company}','${min_xth}', '${min_xiith}', '${min_curr}')`;
    db.con.query(sql, function (err, result) {
        if (err) {
            res.send({code: 404})
            console.log(err);
        } else {
            notifyAll();
            res.send({code: 200})
            console.log("Record Inserted.")
        }
    });
};






exports.viewjobdata = (req, res) => {
    const sql = `select * from applications, users where jobID = '${req.params.id}' and applications.userid = users.id`
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result)
            res.render("viewJobData", { jobData: result})
        }
    });
}



exports.deletefromlib = (req, res) => {
    const sql = `delete from jobs where jobID = '${req.params.id}'`
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                alert: "yes",
                title: "Done.",
                text: "Job deleted from list.",
                icon: "success"})
        }
    });
}




exports.updateQuantity = (req, res) => {
    const id = req.params.id
    const last_date = req.params.ldate;
    const xth = req.params.xth;
    const xii = req.params.xii;
    const curr = req.params.curr;
    res.render("update", {id: id, last_date: last_date, xth: xth, xii: xii, curr: curr});
}

exports.updateDetailsPost = (req, res) => {
    var sql = `UPDATE jobs SET last_date='${req.body.ti}', min_xth='${req.body.xth}', min_xii='${req.body.xii}' , min_curr='${req.body.curr}' WHERE jobID = '${req.body.id}'`;
    db.con.query(sql, function (err, result) {
        if(err){
            console.log(err);
        }else{
            res.render("index", {
                alert: "yes",
                title: "Success",
                text: "Job is updated successfully.",
                icon: "success"})
            console.log("Record Updated.")
        }
    });
}

exports.transaction = (req, res) => {
    const sql = `select * from transactions`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            const final = result;
            final.forEach(function myFunction(i) {
                if(i.issueTill){
                    var date = new Date(i.issueTill);
                    i.issueTill = date.toDateString();
                }else{
                    i.issueTill = "On Hold"
                }
                if(i.issueDate){
                    date = new Date(i.issueDate);
                    i.issueDate = date.toDateString();
                }
                if(i.returnDate){
                    date = new Date(i.returnDate);
                    i.returnDate = date.toDateString();
                }
            })
            res.render("transactions", { bookData: final})
        }
    });
}

exports.transactionUpdate = (req, res) => {
    const sql = `select * from transactions where id = '${req.params.id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("transactionsUpdate", { bookData: result})
        }
    });
}

exports.transactionUpdatePost = (req, res) => {
    if(req.body.it){
        var status = 'I';
        var it = req.body.it;
        var sql = `UPDATE transactions SET issueTill='${it}', status='${status}' WHERE id = '${req.body.id}'`;
        db.con.query(sql, function (err, result) {
            if(err){
                console.log(err);
            }else{
                decreaseBookcount(req.body.id);
                res.render("index", {
                    alert: "yes",
                    title: "Success",
                    text: "Transaction is updated successfully.",
                    icon: "success"})
                console.log("Record Updated.")
            }
        });
    }else{
        var status = 'R';
        var rd = req.body.rd;
        var sql = `UPDATE transactions SET returnDate='${rd}', status='${status}' WHERE id = '${req.body.id}'`;
        db.con.query(sql, function (err, result) {
            if(err){
                console.log(err);
            }else{
                incBookcount(req.body.id)
                res.render("index", {
                    alert: "yes",
                    title: "Success",
                    text: "Transaction is updated successfully.",
                    icon: "success"})
                console.log("Record Updated.")
            }
        });
    }
}

function notifyAll(){
    const sql = `select * from users'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            var i = 0;
            for(i= 0; i < result.length; i++){
                const mailOptions = {
                    from: mail.fromEmail,
                    to: result[i].email,
                    subject: 'New Job Opportunity.',
                    text: `A new job opportunity is added on the portal. Please check your eligibility and apply.`,
                };
                mail.sendMail(mailOptions)
            }
        }
    });
}