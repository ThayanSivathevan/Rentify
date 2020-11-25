import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

//creates the navbar
const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    //creates history
    const history = useHistory();
    //creates a navbar based on if user is logged in or not
    const renderList = ()=>{
        //if logged in return these components
        if(state){
            return [
                <li key="2"><Link to="/orders" value="orders">ORDERS</Link></li>,
                <li  key="5">
                    <button className="btn #26a69a teal lighten-1 logout" onClick={()=>{localStorage.clear() 
                    dispatch({type:"CLEAR"})
                     history.push('/signin')
                    }}>
                            Logout
                    </button>
                </li>
            ]
        }
        //if not logged in return these components
        else{
            return [
          
                <li key="6"><Link to="/signin">SIGN IN</Link></li>,
                <li key="7"><Link to="/signup">SIGN UP</Link></li>
            
        ]
        }

    }

    //returns components 
    return (
            <nav className="bob">
                <div className="nav-wrapper">
                    <ul>
                        <li><Link to="/" id="title" className="left hide-on-med-and-down">RENTIFY</Link></li>
                    </ul>

    
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/aboutus" value="aboutUs">ABOUT US</Link></li>
                        {renderList()}
                        
                    </ul>
                </div>
            </nav>


    );


}


export default NavBar