//imports for libraries
const express = require('express')
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const { root, password } = require('../keys/keys')


//connects to con
const con = mysql.createConnection({
    host: "localhost",
    user: root,
    password: password,
    database: 'rentify'
});
//connects to mysql
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
//gets dates
router.get("/dates/:car", requireLogin, (req, res) => {
    //creates sql statement
    let sql = `SELECT startDate,endDate FROM orders WHERE carID="${req.params.car}" AND endDate>=CURDATE() order by startDate;`
    console.log(sql, req.body.car, req.user)
    //quries statement to server
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }
        res.json(rows)
    })

})

//gets order
router.post("/order", requireLogin, (req, res) => {
    console.log(req.body.startDate)
    //finds totalPrice
    let totalPrice = req.body.dailyPrice * req.body.difference
    //creates sql statement
    let sql = `INSERT INTO rentify.orders (userID,branchID,carID,startDate,endDate,totalPrice) VALUES (${req.user.UsersID},${branchID},${req.body.car},DATE('${req.body.startDate}'),DATE('${req.body.endDate}'),${totalPrice}) `
    //connects tp database and sends query
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }
        else {
            res.json({ result: "Order created successfully" })
        }

    })
    console.log(sql)

})
//gets orders
router.get("/orders", requireLogin, (req, res) => {
    //create sql statement
    let sql = `SELECT o.orderID,o.startDate,o.endDate,o.totalPrice,b.BranchName,b.city,b.location,c.carModel,c.carMake,c.carType,c.carUrl FROM orders o LEFT JOIN (branch b) ON (o.branchID=b.BranchID) LEFT JOIN (car c) ON (o.carID=c.carsID) WHERE userID=${req.user.UsersID} order by startDate desc;`
    //sends query to database and recieve data
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }
        res.json(rows)
    })
    console.log(sql)

})

//deletes order

router.delete("/order/:id", requireLogin, (req, res) => {
    //sql statement
    let sql = `DELETE FROM orders WHERE ${req.params.id}=orderID;`
    console.log(sql)
    //connects to the database and sends query
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })
            console.log(err)
        }
        //lets user know if the order has been deleted
        
        res.json({ result: "Order deleted successfully" })
    })
})
module.exports = router