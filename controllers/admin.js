const db = require("../utils/db")
const mail = require("../utils/mail")
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const ejs = require("ejs")
const res = require("express");
const csv = require("csvtojson");
const fs = require("fs").promises;


const bcrypt = require("bcrypt");

exports.addjobget = (req, res) => {
    res.render("addjob");
}


exports.addjob = (req, res) => {
    const { title, description, last_date, min_curr, min_xth, min_xiith, company } = req.body;
    var uid = uuidv4();


    var sql = `INSERT INTO jobs (identifier, title, description, last_date, company, min_xth, min_xii, min_curr) VALUES ('${uid}', '${title}', '${description}', '${last_date}', '${company}','${min_xth}', '${min_xiith}', '${min_curr}')`;
    db.con.query(sql, function (err, result) {
        if (err) {
            res.send({ code: 404 })
            console.log(err);
        } else {
            notifyAll();
            res.send({ code: 200 })
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
            res.render("viewJobData", { jobData: result })
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
                icon: "success"
            })
        }
    });
}




exports.updateQuantity = (req, res) => {
    const id = req.params.id
    const last_date = req.params.ldate;
    const xth = req.params.xth;
    const xii = req.params.xii;
    const curr = req.params.curr;
    res.render("update", { id: id, last_date: last_date, xth: xth, xii: xii, curr: curr });
}

exports.updateDetailsPost = (req, res) => {
    var sql = `UPDATE jobs SET last_date='${req.body.ti}', min_xth='${req.body.xth}', min_xii='${req.body.xii}' , min_curr='${req.body.curr}' WHERE jobID = '${req.body.id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                alert: "yes",
                title: "Success",
                text: "Job is updated successfully.",
                icon: "success"
            })
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
                if (i.issueTill) {
                    var date = new Date(i.issueTill);
                    i.issueTill = date.toDateString();
                } else {
                    i.issueTill = "On Hold"
                }
                if (i.issueDate) {
                    date = new Date(i.issueDate);
                    i.issueDate = date.toDateString();
                }
                if (i.returnDate) {
                    date = new Date(i.returnDate);
                    i.returnDate = date.toDateString();
                }
            })
            res.render("transactions", { bookData: final })
        }
    });
}

exports.transactionUpdate = (req, res) => {
    const sql = `select * from transactions where id = '${req.params.id}'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("transactionsUpdate", { bookData: result })
        }
    });
}

exports.transactionUpdatePost = (req, res) => {
    if (req.body.it) {
        var status = 'I';
        var it = req.body.it;
        var sql = `UPDATE transactions SET issueTill='${it}', status='${status}' WHERE id = '${req.body.id}'`;
        db.con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                decreaseBookcount(req.body.id);
                res.render("index", {
                    alert: "yes",
                    title: "Success",
                    text: "Transaction is updated successfully.",
                    icon: "success"
                })
                console.log("Record Updated.")
            }
        });
    } else {
        var status = 'R';
        var rd = req.body.rd;
        var sql = `UPDATE transactions SET returnDate='${rd}', status='${status}' WHERE id = '${req.body.id}'`;
        db.con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                incBookcount(req.body.id)
                res.render("index", {
                    alert: "yes",
                    title: "Success",
                    text: "Transaction is updated successfully.",
                    icon: "success"
                })
                console.log("Record Updated.")
            }
        });
    }
}

function notifyAll() {
    const sql = `select * from users'`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            var i = 0;
            for (i = 0; i < result.length; i++) {
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


exports.register = (req, res) => {
    res.render("register", { alert: "no" })
}


exports.signup = async (req, res) => {
    const { fname, lname, password, dob, gender, email, phone, city, address, state, pin, xth, xii, curr, resume } = req.body;
    var encrypass = await bcrypt.hash(password, saltRounds);

    var sql = `INSERT INTO users (first_name, last_name, password, gender, dob, email, phone, address, city, state, pin, role, xth, xii, curr, resume) VALUES ('${fname}', '${lname}', '${encrypass}', '${gender}', '${dob}', '${email}', '${phone}', '${address}', '${city}', '${state}', '${pin}', 0, '${xth}', '${xii}', '${curr}', '${resume}')`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            if (err.code == 'ER_DUP_ENTRY') {
                res.render("register", {
                    alert: "yes",
                    title: "Email Already Exists...",
                    text: "Please use a different email address.",
                    icon: "error",
                })
            } else {
                res.render("register", {
                    alert: "yes",
                    title: "Sorry..",
                    text: "Something went wrong.",
                    icon: "error",
                })
            }
        } else {
            console.log("1 record inserted");
            res.render("login", {
                alert: "yes",
                title: "Registration Successful.",
                text: "Please login to continue.",
                icon: "success"
            })
        }

    });
};

exports.addStudentsFromCSVPost = async (req, res) => {
    try {
        const file = req.files.data;
        await fs.writeFile("files/temp/data.csv", file.data);
        const jsonArray = await csv().fromFile("files/temp/data.csv");
        var count = 0;
        var errorArray = [];
        var alreadyPresent = [];
        for (var i = 0; i < jsonArray.length; i++) {
            try {
                var first_name = jsonArray[i]["First Name"];
                var last_name = jsonArray[i]["Last Name"];
                var gender = jsonArray[i]["Gender"];
                var dob = jsonArray[i]["DOB"];
                var email = jsonArray[i]["Email"];
                var pass = jsonArray[i]["Choose a Password"];
                var password = await bcrypt.hash(jsonArray[i]["Choose a Password"], 10);
                var phone = jsonArray[i]["Phone Number"];
                var address = jsonArray[i]["Address"];
                var city = jsonArray[i]["City"];
                var state = jsonArray[i]["State"];
                var pin = jsonArray[i]["Pin"];
                var xth = jsonArray[i]["Xth Marks"];
                var xii = jsonArray[i]["XIIth Marks"];
                var curr = jsonArray[i]["Current Marks"];
                var resume = jsonArray[i]["Resume Link"];

                var r = await shouldAdd(email);
                console.log(r)
                if (!r) {
                    alreadyPresent.push(email);
                } else {
                    const sql = `INSERT INTO users (first_name, last_name, password, gender, dob, email, phone, address, city, state, pin, role, xth, xii, curr, resume) VALUES ('${first_name}', '${last_name}', '${password}', '${gender}', '${dob}', '${email}', '${phone}', '${address}', '${city}', '${state}', '${pin}', 0, '${xth}', '${xii}', '${curr}', '${resume}')`;
                    db.con.query(sql, async (err, result) => {
                        if (err) {
                            console.log(err);
                            errorArray.push(roll_no);
                        } else {
                            const mailOptions = {
                                from: mail.fromEmail,
                                to: req.session.email,
                                subject: 'User Registered',
                                text: `Your have been registered succesfully with our portal CV-Engine. Your login credentials are as follows: <br> Email: ${email} <br>Password: ${pass}`,
                            };
                            await mail.sendMail(mailOptions);
                            count++;
                        }
                    });
                }
            } catch (err) {
                console.log(err);
                errorArray.push(email);
            }
        }

        await fs.unlink("files/temp/data.csv");
        // await sleep(3000);
        // console.log(count + " students are added successfully.");
        if (errorArray.length || alreadyPresent.length) {
            var msg = {
                title: "Oops!",
                content: count + " students are added successfully. " + errorArray.length + " students could not be added. They may be already present in database. Please verify. Emails are " + errorArray + " " + alreadyPresent,
            };
            res.render("index", {
                alert: "yes",
                title: "Oops!",
                text: msg.content,
                icon: "error"
            });
        } else {
            res.render("index", {
                alert: "yes",
                title: "Success!",
                text: "All students are added successfully.",
                icon: "success"
            });
        }


    } catch (err) {
        console.log(err)
        var msg = {
            title: "Oops!",
            content: count + " students are added successfully. " + errorArray.length + " students could not be added. They may be already present in database. Please verify. Roll numbers are " + errorArray,
        };
        res.render("index", {
            alert: "yes",
            title: "Oops!",
            text: msg.content,
            icon: "error"
        });
    }
};

var shouldAdd = function (email) {
    return new Promise(function (resolve, reject) {
        var sql1 = `select * from users where email = '${email}'`;
        db.con.query(sql1, (err, result) => {
            if (err) {
                reject(Error("It broke"));
            } else {
                if (result.length) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        })

    });
}