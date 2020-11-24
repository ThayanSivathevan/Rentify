import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory();
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData=()=>{

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Please enter valid email", classes: "#26a69a teal lighten-1" })
            return;
        }

        fetch("/signup", {

            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fName,
                lName,
                password,
                email
                
            })

        }).then(res => res.json()).then(data => {

            if (data.error) {
                M.toast({ html: data.error, classes: "#26a69a teal lighten-1" })
            }
            else {
                M.toast({ html: data.result, classes: "#26a69a teal lighten-1" })
                history.push("/signin")
            }
        }).catch(err => {
            console.log(err)
        })
    }




    return (
        <div className="signup">
	    
    	<div id="image"></div>

		<div id="submit">
			<div className="submitBox">
				<div className="row">
					<label id="rentifySignup">RENTIFY SIGNUP</label>
					
						<div className="row">
							<div className="input-field col s6">
								<input type="text" id="firstName" placeholder="first name" onChange={(e) => setFName(e.target.value)} name="firstName"  />
							</div>
							<div className="input-field col s6">
								<input type="text" id="lastName" placeholder="last name" onChange={(e) => setLName(e.target.value)} name="lastName"  />
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="email" id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} name="email"  />
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
		    					<input type="password" id="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}  />
		    				</div>
		    			</div>
		    			<button type="submit" className="btn" form="form" value="Submit" onClick={() =>postData() }>Sign Up</button>

		    	</div>
		    </div>	
		</div>

        </div>
    )
}

export default Signup