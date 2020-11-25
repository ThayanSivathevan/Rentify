import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    const renderList = ()=>{
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
        else{
            return [
          
                <li key="6"><Link to="/signin">SIGN IN</Link></li>,
                <li key="7"><Link to="/signup">SIGN UP</Link></li>
            
        ]
        }

    }


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