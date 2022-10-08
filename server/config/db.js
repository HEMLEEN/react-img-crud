const mysql = require('mysql2');
const colors = require('colors');


db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }

    else{
        console.log("Database has been connected".underline.cyan)
    }
});

module.exports =db
