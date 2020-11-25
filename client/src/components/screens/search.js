//creates imports
import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
//creates search component
const Search = () => {
    //creates history object
    const history = useHistory();
    //creates user parameters based on url
    const p = useParams()
    //creates variables for states
    const [data, setData] = useState()
    const [car, setCar] = useState()
    const [dates, setDates] = useState()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState();
    const [maxDate, setMaxDate] = useState()
    const [name, setName] = useState();
    const [page, setPage] = useState(0);
    //on load get fetches from backend to get cars for specific conditions 
    useEffect(() => {
        fetch(`/cars/${p.make}/${p.price}/${p.city}/${p.date}`, {

            headers: {
                "Content-Type": "application/json"
            }

        }).then(res => res.json()).then(res => {
            //checks if there are cars and pushes the site to home if there are no cars
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                return history.push('/')
            }
            setData(res)

        })
    }, [])

    //when creating an order gets all the dates for the car to check if there are conflicting days
    const getDates = (id, name1, name2) => {
        setCar(id);
        setName(name1 + " " + name2)
        //sends a get request to retrieve dates for the specific car
        fetch(`/dates/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

        }).then(res => res.json()).then(res => {
            //checks if logged in
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                if (!localStorage.getItem("jwt")) return history.push('/signin')
            }
            else {
                //maps dates creating exclusion ranges for the date picker
                let d = new Array();
                //maps the dates
                res.map(item => {
                    let currentDate = new Date(item.startDate);
                    currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
                    let endDate = new Date(item.endDate);
                    //adds each dates between start date and end date to the exclusion
                    while (currentDate < endDate) {

                        d.push(currentDate);
                        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
                        d.push(currentDate);
                    }

                })
                //finds first availible start day for the date pick based on excluded days
                for (let i = 0; i < d.length; i++) {
                    if (createDate(d[i]) === createDate(startDate)) {
                        setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)))

                    }
                }

                setPage(1);
                setDates(d)
            }
        })

    }

    const getFirstDate = () => {
        //checks if start date is set
        if (startDate) {
            //moves user to second page
            setPage(2)
            setEndDate(startDate)
            let next;
            //finds the next excluded day to set the end date range, if an next excluded day exists
            dates.map(item => {
                if (!next) {
                    if (startDate <= item) {

                        next = item
                    }
                }
                else {
                    if (startDate <= item && item < next) {
    
                        next = item
                    }
                }
            })
            //if there is an excluded day sets it to that day
            if (next) setMaxDate(new Date(next.setDate(next.getDate() - 1)))
        }
        else {
            //asks user to enter day
            M.toast({ html: "Please Enter Date", classes: "#26a69a teal lighten-1" })
        }
    }

    const getLastDate = () => {
        //if end date submitted creates a post request to create an order in the back end
        if (endDate) {
            fetch('/order', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    //data given by user
                    difference: findDifference(),
                    startDate: createDate(startDate),
                    endDate: createDate(endDate),
                    car
                })

            }).then(res => res.json()).then(res => {
                if (res.error) {
                    M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                }
                else {
                    //tells the user if the order is sucessful and moves them to the orders page
                    M.toast({ html: res.result, classes: "#26a69a teal lighten-1" })
                    history.push('/orders')
                }
            }
            )
        }
        else {
            //tell user to enter day
            M.toast({ html: "Please Enter Date", classes: "#26a69a teal lighten-1" })
        }
    }

    const goBack= () =>{
        //send user back to previous order page
        setPage(1)
        setEndDate(null)
        setMaxDate(null)
    }
    const createDate = (today) => {
        //creates date in yyyy/mm/dd format
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const findDifference = () => {
        //finds difference in days
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }
    const cancel = () => {
        //cancels current order form
        setCar(null)
        setMaxDate(null)
        setDates(null)
        setEndDate(null)
        setStartDate(new Date())
        setPage(0)
        setName("")
    }
    const createForm = () => {
        //creates form for user to create order
        //first page to get start date
        if (page === 1) {
            return (
                <div id="order1" className="modal">
                    <div className="modal-content">
                    <span className="close"><i className="material-icons" onClick={()=>cancel()}>cancel</i></span><br />
                        <div className="form-popup" id="myForm">
                            <div className="form-container">
                                <label className="orderTitle">Order Information</label><br></br><br></br>
                                <label id="make">
                                    <label className="orderLabel">Car:</label>
                                    <label className="orderCar" id="car">{name}</label>
                                </label>
                                <br />
                                <label className="orderLabel startDate">Start Date:</label>
                                {/* creates dates with exclusive range */}
                                <DatePicker
                                    className="datepicker"
                                  
                                    selected={startDate}
                                    onChange={date => { setStartDate(date) }}
                                    minDate={new Date()}
                                    excludeDates={dates}
                                />
                                
                            </div>
                            <button className="btn next" onClick={(e) => { getFirstDate() }}>Next</button>
                        </div>
                    </div>
                </div>)
        }
        //second page to get end date
        else if (page === 2) {
            return (
                <div id="order1" className="modal">
                    <div className="modal-content">
                    <span className="close"><i className="material-icons" onClick={()=>cancel()}>cancel</i></span><br />
                        <div className="form-popup" id="myForm">
                            <div className="form-container">
                                <label className="orderTitle">Order Information</label><br></br><br></br>
                                <label id="make">
                                    <label className="orderLabel">Car:</label>
                                    <label className="orderCar" id="car">{name}</label>
                                </label>
                                <br />
                                <label className="orderLabel endDate">End Date:</label>
                                 {/* creates dates with exclusive range */}
                                <DatePicker

                                    className="datepicker"
                                    selected={endDate}
                                    onChange={date => { setEndDate(date) }}
                                    minDate={startDate}
                                    maxDate={maxDate}
                                />
                                
                            </div>
                            <button className="btn back" onClick={(e) => { goBack() }}>Back</button>
                            <button className="btn submit" onClick={(e) => { getLastDate() }}>Submit</button>
                        </div>
                    </div>
                </div>)
        }
    }
    return (
        <div className="main">

            <div className="gallery">
                {/* maps all the cars  */}
                {data ? data.map(item => {

                    return (
                        <div key={item.carsID} className="col s12 m6">
                            <div className="card">
                                <div className="card-image">
                                    <img src={item.carUrl} width="300" height="150" />
                                    <span className="card-title">{item.carMake + " " + item.carModel}</span>
                                    <a className="btn-floating halfway-fab waves-effect waves-light teal lighten-1">
                                        <i onClick={e => getDates(item.carsID, item.carMake, item.carModel)} className="material-icons add">+</i>
                                    </a>
                                </div>
                                <div className="card-content">
                                    <p className="carDescription"><b>{item.carType}</b> - <b>{item.carBuild}</b> </p>
                                    <p className="carDescription"><b><u>${item.dailyPrice}/day</u></b></p>
                                    <p className="carDescription">Located at <b>{item.BranchName}</b> at <b>{item.Location}</b> in <b>{item.city}</b></p>

                                </div>
                            </div>
                        </div>
                    )
                })
                    :
                    <h6>Fetching results...</h6>
                }
            </div>

            {
                
                createForm()
            }
        </div>

    )
}

export default Search