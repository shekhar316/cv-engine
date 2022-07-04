const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");

exports.viewEbooks = (req, res) => {
    const sql = `select * from ebooks`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("ebook", { ebookData: result})
        }
    });
}

exports.viewEbookbyid = (req, res) => {
    var id = req.params.id
    var sql = `select * from ebooks where ebookID = ${id}`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }else {
            res.render("viewEbookbyid", { Data: result});
        }
    });
}

exports.getebook = (req, res) => {
    var id = req.params.id
    var text = "Please find the attached ebook you have requested from our website.";
    ejs.renderFile(process.env.DIRNAME + "/views/email.ejs", {msg: text}, function (err, data){
        if(err){
            console.log(err)
        }else{
            const mailOptions = {
                from: mail.fromEmail,
                to: req.session.email,
                subject: 'Your Ebook is here',
                html: data,
                attachments: [{
                    path: process.env.DIRNAME + '/Files/ebooks/' + id + '.pdf'
                }]
            };
            mail.sendMail(mailOptions)
            res.render("index", {
                alert: "yes",
                title: "Success",
                text: "Your book will be sent to your registered email shortly.",
                icon: "success"})
        }
    })

}