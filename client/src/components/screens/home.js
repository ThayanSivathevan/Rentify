//creates imports
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
//creates a custom home component
const Home = () => {
	//creates history object
	const history = useHistory();
	//creates variables to store states of values in car table 
	const [make, setMake] = useState("any")
	const [price, setPrice] = useState("any")
	const [date, setDate] = useState("any")
	const [city, setCity] = useState("any")
	//changes the site to the custom search component based on values
	const postData = () => {
		history.push('/search/' + make + '/' + price + '/' + city + '/' + date)
	}

	//converts date object to be in yyyy/mm/dd format
	const today = () => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}

	//returns components
	return (
		<div className="main">

			<div id="image"></div>
			<div id="submit">
				<div className="submitBox">
					<div className="input-field col s12">
						{/* {input for all the components} gets values for query*/}
						<div id="form-inline">
							<label className="homeLabel">MAKE:</label>
							<select className="select" onChange={(e) => setMake(e.target.value)}>
								<option default value="any">Any MAKE</option>
								<option value="Classic">Classic</option>
								<option value="Luxury">Luxury</option>
								<optgroup label="Classic">
									<option value="Acura">Acura</option>
									<option value="BMW">BMW</option>
									<option value="Chrysler">Chrysler</option>
									<option value="Dodge">Dodge</option>
									<option value="Ford">Ford</option>
									<option value="Honda">Honda</option>
									<option value="Mazda">Mazda</option>
									<option value="Nissan">Nissan</option>
									<option value="Toyota">Toyota</option>

								</optgroup>
								<optgroup label="Luxury">
									<option value="Aston Martin">Aston Martin</option>
									<option value="Bentley">Bentley</option>
									<option value="Cadillac">Cadillac</option>
									<option value="Ferrari">Ferrari</option>
									<option value="Jaguar">Jaguar</option>
									<option value="Lamborghini">Lamborghini</option>
									<option value="Porsche">Porsche</option>
									<option value="Rolls Royce">Rolls Royce</option>
									<option value="Tesla">Tesla</option>
								</optgroup>
							</select>
							<label className="homeLabel">MAX. PRICE:</label><br />
							<select onChange={(e) => setPrice(e.target.value)}>
								<option default value="any">Any Price</option>
								<option value="50">$50</option>
								<option value="100">$100</option>
								<option value="150">$150</option>
								<option value="200">$200</option>
								<option value="250">$250</option>
								<option value="300">$300</option>
								<option value="350">$350</option>
								<option value="500">$500</option>
								<option value="1000">$1000</option>
							</select>
							<label className="homeLabel">LOCATION:</label><br />
							<select onChange={(e) => setCity(e.target.value)}>
								<option default value="any">Any Location</option>
								<option value="Toronto">Toronto</option>
								<option value="Mississauga">Mississauga</option>
								<option value="Oshawa">Oshawa</option>
								<option value="Ottawa">Ottawa</option>
								<option value="Milton">Milton</option>
								<option value="Newmarket">Newmarket</option>
							</select>
							<label className="homeLabel">DATE:</label><br />
							<input type="date" id="dateSelect" name="date" min={today()} onChange={(e) => setDate(e.target.value)} />
							<Link to={'/search/' + make + '/' + price + '/' + city + '/' + date}><button type="submit" className="btn submitBtn" onChange={(e) => postData(e.target.value)} value="Submit">Submit</button>
							</Link>
						</div>
					</div>
				</div>
			</div>


		</div>
	)
}

export default Home