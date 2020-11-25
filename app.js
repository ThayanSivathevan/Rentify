var express = require('express');
var app = express();
var mysql= require('mysql');
const PORT=5000;
app.use(express.json());




app.use(require('./routes/auth'))
app.use(require('./routes/common'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
	console.log("Server is running on",PORT);
})
