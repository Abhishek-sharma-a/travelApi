const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: 'root',
    password: '',
    database: 'travel',
})

con.connect((err)=>{
    if (err) {
        console.warn("error in connection.");
    }
    else{
        console.log("success");
    }
   
})
module.exports=con;