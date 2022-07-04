const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

exports.view = (req, res) => {
    const sql = `select * from archives`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("archives", { bookData: result})
        }
    });
}

exports.manage = (req, res) => {
    const sql = `select * from archives`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("archivesManage", { bookData: result})
        }
    });
}

exports.add = (req, res) => {
    res.render("addArchive", {alert: "no"})
}

exports.update = (req, res) => {
    const id = req.params.id;
    const sql = `select * from archives where id = '${id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("updateArchive", {details: result})
        }
    });
}
exports.remove = (req, res) => {
    const id = req.params.id;
    const sql = `delete from archives where id = '${id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                alert: "yes",
                title: "Removed Successfully.",
                text: "Please continue.",
                icon: "success"})
        }
    });
}

exports.updateA = (req, res) => {
    const {id, name, link} = req.body;
    const sql = `UPDATE archives SET name='${name}', link='${link}' WHERE id = '${id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                alert: "yes",
                title: "Updated Successfully.",
                text: "Please continue.",
                icon: "success"})
        }
    });
}


exports.addNew = (req, res) => {
    const {name, link} = req.body;
    const sql = `insert into archives (name, link) values('${name}', '${link}')`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                alert: "yes",
                title: "Added Successfully.",
                text: "Please continue.",
                icon: "success"})
        }
    });
}