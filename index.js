const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


// let createRandomUser = () => {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// } 

//console.log(createRandomUser());

let getRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

console.log(getRandomUser());


// TOPIC 2 MYSQL PACKAGE

//connecting node with MYSQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app', //db in sql
  password: 'ravi' //password of mysql
});


let q = "SHOW TABLES";

try{
    connection.query(q, (err, result) => {
    if(err) throw err ;
    console.log(result);
    console.log(result.length);
    console.log(result[0]);
    console.log(result[1]);

    });
} catch (err){
    console.log(err);
}

//connection.end();

//type "quit" to exit from CLI SQL

//TOPIC 5 INSERT INTO user
/*
let query = "INSERT INTO user (id, username, email , password) VALUES ?";
let users = [["123a","123_newusera","abc1@gmail.com","abc1"],
            ["123b","123_newuserb","abc2@gmail.com","abc2"],
            ["123c","123c_newuser","abc3@gmail.com","abc3"]    
            ];

try{
    connection.query(query,[users], (err, result) => {
    if(err) throw err ;
    console.log(result);
    });
} catch (err){
    console.log(err);
}
*/

//TOPIC 6 INSERT IN BULK

let getRandomUser1 = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

let q1 = "INSERT INTO user (id, username, email , password) VALUES ?";
let data = [];
for(let i=1 ; i<=107 ; i++){
    data.push(getRandomUser1());//100 fake user's data
}

try{
    connection.query(q1,[data] , (err,result) => {
        if(err) throw err;
        console.log(result);
    });
} catch(err){
    console.log(err);
}

connection.end();

