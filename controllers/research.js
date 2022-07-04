const db = require("../utils/db")
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

exports.view = (req, res) => {
    res.render("research")
}

exports.doi = (req, res) => {
    res.render("doi");
}

exports.scholar = (req, res) => {
    res.render("scholar");
}

exports.sch = (req, res) => {
    const s = req.body.s;
    res.redirect("http://scholar.google.ch/scholar?hl=en&q="+s);
}

exports.doiDown = (req, res) => {
    const doi = req.body.doi;
    res.redirect("https://sci-hub.hkvisa.net/"+doi);
}