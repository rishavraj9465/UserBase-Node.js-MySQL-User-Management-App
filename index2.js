const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));




// TOPIC 8 Home Route

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app', //db in sql
  password: 'ravi' //password of mysql
});


let getRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}



app.get("/", (req,res) =>{
    let q = `select count(*) from user`;
    try{
    connection.query(q, (err,result) => {
        if(err) throw err;
        let count = result[0]["count(*)"];
        res.render("home.ejs", {count});//TOPIC 9 ADD TEMPLATE 
    });
    } catch(err){
        console.log(err);
        res.send("some error in DB");
    }
})


//TOPIC 10 SHOW ROUTE

app.get("/users",(req,res) => {
    q1 = `select * from user`;
    try{
        connection.query(q1, (err,users) => {
            if(err) throw err;
            // console.log(result);
            res.render("showusers.ejs", {users});
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
    
});

//TOPIC 11 EDIT ROUTE - TO GET FORM ONLY

app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params ;
    let q = `select * from user where id = '${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err) throw err;
            console.log(result);
            let user = result[0];

            res.render("edit.ejs", { user });
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
    
 });


//TOPIC 12 UPDATE ROUTE                          

app.patch("/user/:id" , (req,res) => {
    let {id} = req.params ;
    let {password: formPass ,username: newUsername} = req.body ;
    let q = `select * from user where id = '${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err) throw err;
            console.log(result);
            let user = result[0];
            if(formPass != user.password) {
                res.send("WRONG password");
            }else{
                let q2 = `UPDATE user SET username = '${newUsername}' where id = '${id}' `;
                connection.query(q2 , (err,result) => {
                    if(err) throw err;
                    res.redirect("/users");
                });
            }
            
        });
    }catch(err){
        console.log(err);
        res.send("some error in DB");
    }
});



app.listen("8080", () => {
    console.log("server is listening to port 8080");
})
