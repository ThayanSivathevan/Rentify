const jwt = require('jsonwebtoken')
const {JWT_SECRET,root,password}=require('../keys/keys')
const mysql= require('mysql');
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
module.exports =(req,res,next)=>{
	const {authorization}=req.headers;
	//authorization === Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
	if(!authorization){
		res.status(401).json({error:"you must be logged in"});
	}
	const token=authorization.replace("Bearer ","");
	jwt.verify(token,JWT_SECRET,(err,payload)=>{
		if(err){
			return res.status(401).json({error:"You must be logged in"})
		}

        const {id}=payload;
        let sql=`SELECT * FROM rentify.Users WHERE UsersID='${id}'`;
		con.query(sql,(err,row)=>{
            if (err){
                return res.status(422).json({error:"Not Avalible"});
            }
           if(Object.keys(row).length==0){
             return res.status(422).json({error:"Signin failed"});
           }
           req.user=row[0];
           next()
        })
	
	})
}