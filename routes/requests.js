const express = require('express')
const mysql= require('mysql');
const jwt = require('jsonwebtoken')
const router =express.Router()
const requireLogin=require('../middleware/requireLogin')
const {root,password}=require('../keys/keys')

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
router.post("/findcars",(req,res)=>{
    let sql=`SELECT c.*,b.city,b.Location,b.BranchName FROM car c LEFT JOIN branch b ON c.branchID=b.BranchID WHERE TRUE`;
    console.log(req.body.p)
    if(req.body.p.make!="any"){
      if(req.body.p.make==="Classic" || req.body.p.make==="Luxury"){
        sql+=` AND carType="${req.body.p.make}"`
      }
      else{
        sql+=` AND carMake="${req.body.p.make}"`
      }
    }
    if(req.body.p.price!="any"){
      sql+=` AND dailyPrice<="${req.body.p.price}"`
    }
    if(req.body.p.city!="any"){
      sql+=` AND "${req.body.p.city}"=(SELECT city FROM branch WHERE c.branchID=BranchID)`
    }
    if(req.body.p.date!="any"){
      sql+=` AND NOT EXISTS(SELECT carID FROM orders WHERE startDate<=DATE("${req.body.p.date}" ) AND endDate>=  DATE("${req.body.p.date}" ) AND carsID=carID)`
    }
    sql+=";"
    console.log(sql)
    con.query(sql,(err,rows)=>{
        if (err){
            return res.status(422).json({error:err})
            
       }
       if(Object.keys(rows).length==0){
         return res.status(422).json({error:"No cars found"})
       }
       res.json(rows)
    })
})


module.exports=router