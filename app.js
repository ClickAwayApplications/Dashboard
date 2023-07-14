const express = require('express');
const mysql = require('mysql');

//creating connection batabased 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clickawaydata'
});

//connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected....');
});



const app = express();

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE clickawaydata';
    db.query(sql, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('Database created...');
    });
});

//create table 
app.get('/registration', (req, res) => {
    let sql = `CREATE TABLE UserProfileTable (
        ID_NUMBER INT, 
        ROLE VARCHAR(255), 
        NAME VARCHAR(255), 
        SURNAME VARCHAR(255), 
        EMAIL VARCHAR(255), 
        CONTACT VARCHAR(255), 
        PASSWORD VARCHAR(255), 
        PRIMARY KEY (ID_NUMBER))`;
    db.query(sql, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('User Profile Table Created.....');
    });
});

// //inserting User Profile Data
app.get('/profileData', (req, res) => {
    let post = { 
                 ID_NUMBER: '9611025423083',
                 NAME: 'TERROR TIVANI',
                 SURNAME: 'MAYIMELE', 
                 EMAIL: 'terror.tivani@gmial.com',
                 CONTACT: '0790874693', 
                 PASSWORD: 'clickaway1234',
                 };
    let sql = 'INSERT INTO UserProfileTable SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('Data inserting....')
    });

});


const PORT = process.env.PORT || 8000;
app.listen(PORT,function () {
    console.log(`server started on port ${PORT}`)
}); 