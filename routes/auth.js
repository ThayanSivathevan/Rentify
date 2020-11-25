const mysql= require('mysql');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,root,password}=require('../keys/keys')

const express = require('express')
const router =express.Router()

const con= mysql.createConnection({
  host: "localhost",
  user: root,
  password:password,
  database: 'rentify'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post('/signup',(req,res)=>{
    const {email,fName,lName}=req.body
    var pass
    if(!email || !fName ||!lName || !req.body.password){
        return res.status(422).json({error:"Please fill all fields"})
    }
    sql=`INSERT INTO rentify.users (Email, firstName, lastName, password) 
    VALUES ('${email}','${fName}','${lName}','${req.body.password}');`
    con.query(sql, function (err, rows) {
        if (err){
             return res.status(422).json({error:"Email already used"})
        }
        return res.json({result:"Signed up sucessfully"})
     });
    
})

//creates a signin authentication
router.post('/signin',(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    return res.status(422).json({error:"Please fill all fields"})
  }
  sql=`SELECT * FROM rentify.users WHERE '${password}'=password AND '${email}'=Email`
  con.query(sql, function (err, rows) {
      if (err){
           return res.status(422).json({error:"Not Avalible"})
      
      }
      if(Object.keys(rows).length==0){
        return res.status(422).json({error:"Incorrect email/password"})
      }
      const token = jwt.sign({id:rows[0].UsersID},JWT_SECRET)
      console.log(rows[0],token,rows[0].id)
      const {UsersID,firstName,lastName}=rows[0]
      res.json({user:{UsersID,firstName,lastName},token});
      
  });

})




module.exports=router