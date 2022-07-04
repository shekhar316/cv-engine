const db = require("../utils/db")

exports.viewAllNotices = (req, res) => {
    const sql = `select * from notices`;
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render("viewAllNotices", { notices: result})
        }
    });
}

exports.createNotice = (req, res) => {
    res.render("createNotice");
}


exports.createNoticePost = (req, res) => {
    const {title, content} = req.body;
    const sql = `insert into notices (title, body) values('${title}', '${content}')`;
    try{
        db.con.query(sql, function (err, result) {
            if (err) {
                const err = {
                    code: 500,
                    title: "Oops!",
                    content: "Something went wrong. Please try again later."
                }
                res.send(err);
            } else {
                const succ = {
                    code: 200,
                    title: "Success!",
                    content: "Notice is created successfully."
                }
                res.send(succ)
            }
        });
    }catch{
        const err = {
            code: 500,
            title: "Oops!",
            content: "Something went wrong. Please try again later."
        }
        res.send(err);
    }
}

exports.viewById = (req, res) => {
    const id = req.params.id
    const sql = `select * from notices where id = ${id}`;
    try{
        db.con.query(sql, function (err, result) {
            if (err) {
                res.render("error");
            }else {
                const notice = {
                    id: result[0].id,
                    title: result[0].title,
                    content: result[0].body,
                    created_at: result[0].created_at.toLocaleString(),
                    updated_at: result[0].updated_at.toLocaleString()
                }
                res.render("viewNoticeById", { notice: notice});
            }
            // console.log(notice)
        });
    }catch{
        res.render("error");
    }
}

exports.updateNotice = (req, res) => {
    const {id, title, content} = req.body;
    const sql = `UPDATE notices SET title = '${title}', body = '${content}' where id = '${id}'`;
    try{
        db.con.query(sql, function (err, result) {
            if (err) {
                const error = {
                    code: 500,
                    title: "Oops!",
                    content: "Something went wrong. Please try again later."
                }
                console.log(err)
                res.send(error)
            } else {
                const succ = {
                    code: 200,
                    title: "Success!",
                    content: "Notice is updated successfully."
                }
                res.send(succ)
            }
        });
    }catch{
        const error = {
            code: 500,
            title: "Oops!",
            content: "Something went wrong. Please try again later."
        }
        res.send(error);
    }
}



exports.deleteNotice = (req, res) => {
    const {id} = req.body;
    const sql = `delete from notices where id = '${id}'`;
    try{
        db.con.query(sql, function (err, result) {
            if (err) {
                const error = {
                    code: 500,
                    title: "Oops!",
                    content: "Something went wrong. Please try again later."
                }
                console.log(err)
                res.send(error)
            } else {
                const succ = {
                    code: 200,
                    title: "Success!",
                    content: "Notice is deleted successfully."
                }
                res.send(succ)
            }
        });
    }catch{
        const error = {
            code: 500,
            title: "Oops!",
            content: "Something went wrong. Please try again later."
        }
        res.send(error);
    }
}