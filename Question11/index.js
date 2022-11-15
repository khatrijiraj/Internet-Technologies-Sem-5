const express = require("express");
const app = express()
const mysql2 = require("mysql2");
const bodyParser = require('body-parser');
const path = require("path");

let con = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '9043',
    database: 'ques11db'
})

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/signin.html"))
})

app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname, './public/signin.html'));

})

app.get("/signout", function (req, res) {
    res.sendFile(path.join(__dirname, './public/signin.html'));
})

app.post("/signin", function (req, res) {
    con.connect((error) => {
        let ins = "select* from usertable where username=? and password=?";
        let userid = req.body.userid;
        let password = req.body.password;

        con.query(ins, [userid, password], (er, result) => {
            if (er) throw er
            else
                if (result.length > 0) {
                    res.sendFile(path.join(__dirname, './public/dashboard.html'));
                } else {
                    res.write("Invalid login ID or password!");
                }
        });
    })
})

app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, './public/signup.html'));
})

app.post("/signup", function (req, res) {
    con.connect((error) => {
        if (error) throw Error(error)
        let ins = "insert into usertable (username, password) values('" + req.body.uname + "','" + req.body.password + "')";
        con.query(ins, (er, result) => {
            if (er) res.write(er.message)
            else
                res.sendFile(path.join(__dirname, './public/signin.html'));
        });
    })
})

app.listen(3000,
    () => console.log("Server up and running at port 3000...")
)