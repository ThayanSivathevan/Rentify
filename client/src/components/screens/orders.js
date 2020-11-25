//creates imports

import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import Popup from 'reactjs-popup';

//creates orders component
const Orders = () => {
    //creates useHistory object
    const history = useHistory();
    //creates state variables
    const [pastOrders, setPastOrders] = useState()
    const [presentOrders, setPresentOrders] = useState()
    const [image,setImage]=useState(null)
    //get name from localstorage
    const [name,setName]=useState(()=>{
        const {firstName,lastName}=JSON.parse(localStorage.getItem("user"))
        return firstName+" "+lastName

    })
    //on load gets the user's orders
    useEffect(() => {
        getOrders()
    }, [])
    //get fetch request to retrieve orders
    const getOrders = () => {
        fetch('/orders', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                //authorization token
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }

        }).then(res => res.json()).then(res => {
            //checks if logged in or error
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                return history.push('/login')
            }
            //parses through dates to find  if order is old or current
            let present = [];
            let old = [];
            let day = new Date(createDate(new Date()))
            //maps the data
            res.map(item => {
                let temp = item.endDate
                item.endDate = createDate(new Date(item.endDate))
                item.startDate = createDate(new Date(item.startDate))
                //checks if date is present or old
                if (day > new Date(temp)) {
                    old.push(item)
                }
                else {
                    present.push(item)
                }
            })
            //sets the orders to variables
            setPastOrders(old)
            setPresentOrders(present)
        })
    }

    const cancelOrder=(id)=>{
        //cancels order based on id by sending a delete request to the backend 
        fetch('/order/'+id.toString(), {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(res => {
            //tells the user if there is an error
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
            }
            //lets the user know the order was deleted and re checks the database for the orders
            else{
                M.toast({html:"Order sucessfully deleted", classes: "#26a69a teal lighten-1" })
                getOrders()
            }
           
        })
    }
    //creates database in yyyy/mm/dd format
    const createDate = (today) => {
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    //returns html components
    return (
        <div className="main" id="ord">
            <h1 className="welcome">Welcome, {name} </h1>
            <h2 className="prevLabel">Ongoing Orders</h2>
            {/* maps user's current orders if there are present orders else says fetching */}
            {presentOrders ? presentOrders.map(item => {
                return(
                <div >
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Order #{item.orderID}</h4></li>
                        <button className="right btn cancel" onClick={()=>cancelOrder(item.orderID)}>CANCEL</button>
                        <li className="collection-item" id="car"><a value={item.carUrl} onClick={()=>setImage(item.carUrl)}>{item.carMake} {item.carModel} - {item.carType}</a></li>
                        <li className="collection-item">{item.city} - {item.location}</li>
                        <li className="collection-item">{item.startDate} to {item.endDate}</li>
                        <li className="collection-item">${item.totalPrice}</li>
                    </ul>
                </div>
                )
            }) : <h1>Fetching results ...</h1>}
            <h2 className="prevLabel">Previous Orders</h2>
            {/* maps user's past orders if there are past orders else says fetching */}
            {pastOrders ? pastOrders.map(item => {
                return(
                <div>
                    <div>
                        <ul className="collection with-header">
                            <li className="collection-header"><h4>Order #{item.orderID}</h4></li>
                            <li className="collection-item" id="car"><a value={item.carUrl} onClick={()=>setImage(item.carUrl)}>{item.carMake} {item.carModel} - {item.carType}</a></li>
                            <li className="collection-item">{item.city} - {item.location}</li>
                            <li className="collection-item">{item.startDate} to {item.endDate}</li>
                            <li className="collection-item">${item.totalPrice}</li>
                        </ul>
                    </div>

                </div>
                )
            }) : <h1>Fetching results ...</h1>}
            {/* shows the order's car image */}
            {image?<div id="myCar" className="modal">
                <span className="close" id="closeImg" ><i className="material-icons" onClick={() => setImage(null)}>cancel</i></span>
                <img className="modal-content" id="img01" src={image} width="300" height="300" />
            </div>: <p></p>}
        </div>
    )


}
export default Orders