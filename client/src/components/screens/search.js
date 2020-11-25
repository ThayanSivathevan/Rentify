import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
    const history = useHistory();
    const p = useParams()

    const [data, setData] = useState()
    const [car, setCar] = useState()
    const [dates, setDates] = useState()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState();
    const [maxDate, setMaxDate] = useState()
    const [name, setName] = useState();
    const [page, setPage] = useState(0);
    useEffect(() => {
        fetch(`/cars/${p.make}/${p.price}/${p.city}/${p.date}`, {

            headers: {
                "Content-Type": "application/json"
            }

        }).then(res => res.json()).then(res => {
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                return history.push('/')
            }
            setData(res)

        })
    }, [])


    const getDates = (id, name1, name2) => {
        setCar(id);
        setName(name1 + " " + name2)
        fetch(`/dates/${car}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },

        }).then(res => res.json()).then(res => {
            if (res.error) {
                M.toast({ html: res.error, classes: "#26a69a teal lighten-1" })
                if (!localStorage.getItem("jwt")) return history.push('/signin')
            }
            else {
                let d = new Array();
                console.log(res)
                res.map(item => {
                    let currentDate = new Date(item.startDate);
                    currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
                    let endDate = new Date(item.endDate);
                    while (currentDate < endDate) {

                        d.push(currentDate);
                        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
                        d.push(currentDate);
                    }

                })
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
        if (startDate) {
            setPage(2)
            setEndDate(startDate)
            console.log(startDate)
            let next;
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
            if (next) setMaxDate(new Date(next.setDate(next.getDate() - 1)))
        }
        else {
            M.toast({ html: "Please Enter Date", classes: "#26a69a teal lighten-1" })
        }
    }

    const getLastDate = () => {
        console.log(endDate)
        if (endDate) {
            fetch('/order', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
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
                    M.toast({ html: res.result, classes: "#26a69a teal lighten-1" })
                    history.push('/orders')
                }
            }
            )
        }
        else {
            M.toast({ html: "Please Enter Date", classes: "#26a69a teal lighten-1" })
        }
    }

    const goBack= () =>{
        setPage(1)
        setEndDate(null)
        setMaxDate(null)
    }
    const createDate = (today) => {
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const findDifference = () => {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }
    const cancel = () => {
        setCar(null)
        setMaxDate(null)
        setDates(null)
        setEndDate(null)
        setStartDate(new Date())
        setPage(0)
        setName("")
    }
    const createForm = () => {

        if (page === 1) {
            return (
                <div id="order1" className="modal">
                    <div className="modal-content">
                    <span className="close"><i className="material-icons" onClick={()=>cancel()}>cancel</i></span><br />
                        <div className="form-popup" id="myForm">
                            <div className="form-container">
                                <h1>Order Information</h1>
                                <label id="make">
                                    <b>Car:</b>
                                    <label id="car">{name}</label>
                                </label>
                                <br />
                                <label ><b>Start Date:</b></label>
                                <DatePicker
                                    className="datepicker"
                                  
                                    selected={startDate}
                                    onChange={date => { setStartDate(date) }}
                                    minDate={new Date()}
                                    excludeDates={dates}
                                />
                                
                            </div>
                            <button className="btn" onClick={(e) => { getFirstDate() }}>Next</button>
                        </div>
                    </div>
                </div>)
        }
        else if (page === 2) {
            console.log(page)
            return (
                <div id="order1" className="modal">
                    <div className="modal-content">
                    <span className="close"><i className="material-icons" onClick={()=>cancel()}>cancel</i></span><br />
                        <div className="form-popup" id="myForm">
                            <div className="form-container">
                                <h1>Order Information</h1>
                                <label id="make">
                                    <b>Car:</b>
                                    <label id="car">{name}</label>
                                </label>
                                <br />
                                <label ><b>End Date:</b></label>
                                <DatePicker

                                    className="datepicker"
                                    selected={endDate}
                                    onChange={date => { setEndDate(date) }}
                                    minDate={startDate}
                                    maxDate={maxDate}
                                />
                                
                            </div>
                            <button className="btn" onClick={(e) => { getLastDate() }}>Submit</button>
                            <button className="btn" onClick={(e) => { goBack() }}>Back</button>
                        </div>
                    </div>
                </div>)
        }
    }
    return (
        <div className="main">

            <div className="gallery">
                {data ? data.map(item => {

                    return (
                        <div key={item.carsID} className="col s12 m6">
                            <div className="card">
                                <div className="card-image">
                                    <img src={item.carUrl} width="300" height="150" />
                                    <span className="card-title">{item.carMake + " " + item.carModel}</span>
                                    <a className="btn-floating halfway-fab waves-effect waves-light teal lighten-1">
                                        <i onClick={e => getDates(item.carsID, item.carMake, item.carModel)} className="material-icons">+</i>
                                    </a>
                                </div>
                                <div className="card-content">
                                    <p>{item.carType + " " + item.carBuild}</p>
                                    <p>Daily price is ${item.dailyPrice} </p>
                                    <p>Located at {item.BranchName} at {item.Location} in {item.city}</p>

                                </div>
                            </div>
                        </div>
                    )
                })
                    :
                    <h6>loading</h6>
                }
            </div>

            {
                createForm()
            }
        </div>

    )
}

export default Search