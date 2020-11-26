//imports all libraries
const jwt = require('jsonwebtoken')
const {JWT_SECRET,root,password}=require('../keys/keys')
const mysql= require('mysql');
//connects the page to mysql server
const con= mysql.createConnection({
    host: "localhost",
    user: root,
    password:password,
    database: 'rentify'
  });
//connects
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
//exports the middlewar
module.exports =(req,res,next)=>{
  //destructures the authorization from the header in the request
	const {authorization}=req.headers;
  //authorization === Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  //checks if authorized
	if(!authorization){
		res.status(401).json({error:"you must be logged in"});
  }
  //converts the token in the id
  const token=authorization.replace("Bearer ","");
  //verifies token
	jwt.verify(token,JWT_SECRET,(err,payload)=>{
		if(err){
			return res.status(401).json({error:"You must be logged in"})
		}
      //destructures the payload and gets id
        const {id}=payload;
        let sql=`SELECT * FROM rentify.Users WHERE UsersID='${id}'`;
    //finds the user information and sends it to the request    
		con.query(sql,(err,row)=>{
        //error handling
            if (err){
                return res.status(422).json({error:"Not Avalible"});
            }
            //checks if user exists
           if(Object.keys(row).length==0){
             return res.status(422).json({error:"Signin failed"});
           }
           //changes the row
           req.user=row[0];
           next()
        })
	
	})
}