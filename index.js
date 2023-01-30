const express = require("express");
const con = require("./connect.js");
const app = express();
const cors = require('cors');
const nodemailer = require("nodemailer");


app.use(cors());  //it is use for send data to one network to another its gives the error of cros 
// app.get('/products/:id', function (req, res, next) {
//     res.json()
// })

app.use(express.json());
app.get("/", (req, res) => {
    con.query("select * from client", (err, result) => {
        if (err) {
            res.send("error");
        }
        else { res.send(result) }
    })
});

app.post("/", (req, res) => {});
const account_data = { email: "abhi.07on@gmail.com", password: "rkogqsxicyntdauf", service: "gmail" }
app.use(express.json());

app.post('/sendEmail', (req, res) => {
    const data = req.body;

    con.query("INSERT INTO client SET ? ", data, (error, result, fields) => {
        if (error) {
            res.send("email not send")
        }
        else {
            var transporter = nodemailer.createTransport({
                service: account_data["service"],
                auth: {
                    user: account_data["email"],
                    pass: account_data["password"]
                }
            });
            var mailOptions = {
                from: account_data["email"],
                to: req.body.email,
                subject: 'tour booking status',
                text: `hello mr.${req.body.fname} ${req.body.lname},
            ticket is booked for ${req.body.start} to ${req.body.stop}.
            your journey start on ${req.body.sdate}.
             enjoy your trip thanks.`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send('Email sent');
        };
    })
})
app.get("/signup", (req, res) => {
    con.query("select * from signup", (err, result) => {
        if (err) {
            res.send("error");
        }
        else { res.send(result) }
    })
});
app.use(express.json());
app.post('/signup', async(req, res) => {
    const signupdata=req.body;
    const email=req.body.email;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const pass=req.body.pass;
    const dob=req.body.dob;
  console.log(req.body);
  const sql="INSERT INTO `signup`(`email`, `fname`, `lname`, `pass`, `dob`) VALUES ('"+email+"','"+fname+"','"+lname+"','"+pass+"','"+dob+"') "
    con.query(sql, (error, result, fields) =>{
        if (error) {
            // console.log(error);
            res.send("not registered");
        }
        else{
            res.send(signupdata)
        }
    } 
    ) 
})
const port = 4000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})