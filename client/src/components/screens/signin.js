import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'


import M from 'materialize-css'
//create signin component
const Signin = () => {
    const { state, dispatch } = useContext(UserContext)
    //creates variables
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const postData = () => {
        //checks if email is valid
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Please enter valid email", classes: "#26a69a teal lighten-1" })
            return;
        }
        //post request to the server to retrieve user info and verify login
        fetch("/signin", {

            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })

        }).then(res => res.json()).then(data => {
            //returns if sucessfully logged in
            if (data.error) {
                M.toast({ html: data.error, classes: "#26a69a teal lighten-1" })
            }
            else {
                //stores user data
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({ type: "USER", payload: data.user })
                //tells user they are logged in and moves them to home
                M.toast({ html: "Signed in successfully", classes: "#26a69a teal lighten-1" })
                history.push("/")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //returns components for signin
    return (
        <div className="signup">
	    
    	<div id="image"></div>

		<div id="submit">
			<div className="submitBox">
				<div className="row">
					<label id="rentifySignup">RENTIFY LOGIN</label>

						<div className="row">
							<div className="input-field col s12">
								<input type="email"  id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} name="email" />
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
		    					<input type="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} name="password" />
		    				</div>
		    			</div>
		    			<button type="submit" className="btn" form="form" value="Submit" onClick={() => postData()} >Login</button>
		    	</div>
		    </div>	
            </div>
        </div>
    )
}

export default Signin