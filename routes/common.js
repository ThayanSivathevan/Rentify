//imports libraries
const express = require('express')
const mysql= require('mysql');
const jwt = require('jsonwebtoken')
const router =express.Router()
const requireLogin=require('../middleware/requireLogin')
const {root,password}=require('../keys/keys')
//connects to mysql
const con= mysql.createConnection({
  host: "localhost",
  user: root,
  password:password,
  database: 'rentify'
});
//connects the server
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

});
//get request for car
router.get('/cars/:make/:price/:city/:date',(req,res)=>{
  //creates query
    let sql=`SELECT c.*,b.city,b.Location,b.BranchName FROM car c LEFT JOIN branch b ON c.branchID=b.BranchID WHERE TRUE`;
    console.log(req.params)
    //checks if certain filters are filled in and add it to query
    if(req.params.make!="any"){
      if(req.params.make==="Classic" || req.params.make==="Luxury"){
        sql+=` AND carType="${req.params.make}"`
      }
      else{
        sql+=` AND carMake="${req.params.make}"`
      }
    }
    if(req.params.price!="any"){
      sql+=` AND dailyPrice<="${req.params.price}"`
    }
    if(req.params.city!="any"){
      sql+=` AND "${req.params.city}"=(SELECT city FROM branch WHERE c.branchID=BranchID)`
    }
    if(req.params.date!="any"){
      sql+=` AND NOT EXISTS(SELECT carID FROM orders WHERE startDate<=DATE("${req.params.date}" ) AND endDate>=  DATE("${req.params.date}" ) AND carsID=carID)`
    }
    sql+=";"
    console.log(sql)
    //sends the query
    con.query(sql,(err,rows)=>{
      //error handling
        if (err){
            return res.status(422).json({error:err})
            
       }
       if(Object.keys(rows).length==0){
         return res.status(422).json({error:"No cars found"})
       }
       //sends the rows back

       res.json(rows)
    })
})
//routes create cars
router.get('/cars/:carID',(req,res)=>{
  //creates query
  sql=`SELECT c.*,b.city,b.Location,b.BranchName FROM car c LEFT JOIN branch b ON c.branchID=b.BranchID WHERE ${req.params.carID}=c.carsID`
  console.log(sql)
  //sends query

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