const express=require("express");
const app=express();
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.render("index.ejs");
})

app.listen(3000);
var mysql=require("mysql");
var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  null,
    database: "loginfinal"
});

connection.connect(function(err){
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
})

$query="SELECT * FROM students";

connection.query($query,function(err,rows,fields){
    if(err){
        console.log("an error ocurred with the query");
        return;
    }
    console.log("query successfully executed",rows);
})

connection.end(function(){
    console.log("connection closed");
})

