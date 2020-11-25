//imports for libraries
const express = require('express')
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const { root, password } = require('../keys/keys')



const con = mysql.createConnection({
    host: "localhost",
    user: root,
    password: password,
    database: 'rentify'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

router.get("/dates/:car", requireLogin, (req, res) => {
    let sql = `SELECT startDate,endDate FROM orders WHERE carID="${req.params.car}" AND endDate>=CURDATE() order by startDate;`
    console.log(sql, req.body.car, req.user)
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }
        res.json(rows)
    })

})


router.post("/order", requireLogin, (req, res) => {
    console.log(req.body.startDate)
    con.query(`SELECT dailyPrice,branchID FROM car WHERE carsID=${req.body.car}`, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }

        const { dailyPrice, branchID } = rows[0]
        let totalPrice = dailyPrice * req.body.difference
        let sql = `INSERT INTO rentify.orders (userID,branchID,carID,startDate,endDate,totalPrice) VALUES (${req.user.UsersID},${branchID},${req.body.car},DATE('${req.body.startDate}'),DATE('${req.body.endDate}'),${totalPrice}) `
        con.query(sql, (err, rows) => {
            if (err) {
                return res.status(422).json({ error: err })

            }
            else{
                 res.json({ result: "Order created successfully" })
            }
            
        })
        console.log(sql)
    })

})

router.get("/orders", requireLogin, (req, res) => {
    let sql = `SELECT o.orderID,o.startDate,o.endDate,o.totalPrice,b.BranchName,b.city,b.location,c.carModel,c.carMake,c.carType,c.carUrl FROM orders o LEFT JOIN (branch b) ON (o.branchID=b.BranchID) LEFT JOIN (car c) ON (o.carID=c.carsID) WHERE userID=${req.user.UsersID} order by startDate desc;`
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })

        }
        res.json(rows)
    })
    console.log(sql)

})


router.delete("/order/:id",requireLogin,(req,res)=>{
    let sql=`DELETE FROM orders WHERE ${req.params.id}=orderID;`
    console.log(sql)
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(422).json({ error: err })
            console.log(err)
        }
        res.json({result:"Order deleted successfully"})
    })
})
module.exports = router