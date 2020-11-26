//imports libraries
const mysql= require('mysql');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,root,password}=require('../keys/keys')

const express = require('express')
const router =express.Router()
//connets to the mysql server
const con= mysql.createConnection({
  host: "localhost",
  user: root,
  password:password,
  database: 'rentify'
});
//connects to server
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//route for signing up
router.post('/signup',(req,res)=>{
  //destructures from the body
    const {email,fName,lName}=req.body
    var pass
    //checks if all fields are filled out
    if(!email || !fName ||!lName || !req.body.password){
        return res.status(422).json({error:"Please fill all fields"})
    }
    //creates sql statement
    sql=`INSERT INTO rentify.users (Email, firstName, lastName, password) 
    VALUES ('${email}','${fName}','${lName}','${req.body.password}');`
    //queries the server and creates user
    con.query(sql, function (err, rows) {
        if (err){
             return res.status(422).json({error:"Email already used"})
        }
        return res.json({result:"Signed up sucessfully"})
     });
    
})

//creates a signin authentication
router.post('/signin',(req,res)=>{
  //destructures from body
  const {email,password}=req.body
  //checks if all fields are filled out
  if(!email || !password){
    return res.status(422).json({error:"Please fill all fields"})
  }
   //creates sql statement
  sql=`SELECT * FROM rentify.users WHERE '${password}'=password AND '${email}'=Email`
  //queries the server and creates user
  con.query(sql, function (err, rows) {
      if (err){
           return res.status(422).json({error:"Not Avalible"})
      
      }
      if(Object.keys(rows).length==0){
        return res.status(422).json({error:"Incorrect email/password"})
      }
      //creates token 
      const token = jwt.sign({id:rows[0].UsersID},JWT_SECRET)
      console.log(rows[0],token,rows[0].id)
      //destrutures the columns
      const {UsersID,firstName,lastName}=rows[0]
      //sends it back to the user
      res.json({user:{UsersID,firstName,lastName},token});
      
  });

})




module.exports=router