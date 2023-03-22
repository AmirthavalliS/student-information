
const express = require("express");
const app = express();
const bodyParser = require("body-Parser");
const mysql = require("mysql2");
const cors = require("cors");

const db=  mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Amirtha@121314",
    database: "information"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req, res)=> {
    const sqlGET ="SELECT * FROM students";
    db.query(sqlGET, (error,result) => {
        res.send(result);
    });
});

app.post("/api/post",(req,res) => {
    const  {firstName, lastName, location, email, dob, education } = req.body;
    const sqlInsert = 
    "INSERT INTO students ( firstName, lastName, location, email, dob, education) VALUES ( ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [ firstName, lastName, location, email, dob, education],(error, result) => {
        if (error) {
            console.log(error);
        }else{
            res.send(result)
        }
    });
});

app.delete("/api/remove/:id",(req,res) => {
    const  { id } = req.params;
    const sqlRemove = 
    "DELETE FROM students WHERE id = ?";
    db.query(sqlRemove, id,(error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res) => {
    const  { id } = req.params;
    const sqlGet = 
    "SELECT * FROM students Where id = ?";
    db.query(sqlGet, id,(error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result);
    });
});

app.put("/api/put/:id",(req,res) => {
    const  { id } = req.body;
    const sqlUpdate = 
    "UPDATE students SET firstName = ?, lastName= ?, location= ?, email= ?, dob= ?, education= ? WHERE id = ?";
    db.query(sqlUpdate, [ firstName, lastName, location, email, dob, education,id],(error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result);
    });
});



    app.get("/",(req, res) =>{
    // const sqlInsert = 
    // "INSERT INTO students(firstName,lastName,location,email,dob,education) VALUES ('Ami','s','madurai','ami@gmail.com','1967-11-17','b.e')"
    //  db.query(sqlInsert,(err,result) => {
    //  console.log("error",err);
    //  console.log("result",result);
    // res.send("Hello express");
    // })
    
});
app.listen(5000,() =>{
   console.log("server is running on port 5000");
})