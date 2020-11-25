//creates imports
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const About = () => {
    return (
        <div className="main" id="aboutUs">
            <footer className="page-footer contain">
                <div className="container">
                    <div className="row textBody">
                        <div className="col l6 s12">
                            <h5 className="white-text"><b>About Us</b></h5>
                            <p className="grey-text text-lighten-4">We were founded from the dream of our CEO Mr. Mylo and co-founders of wanting any person drive and experience 
                            the car of their dreams at an affordable price. Mr. Mylo loved cars as a child, hid dad would take him to car shows every month and his love for cars 
                            grew after every visit. Unfortunately Mr. Mylo never had the chance to experience the car of his dream the SF90 spider. After gruaduating from Ontario 
                            Tech University Mr. Mylo made a Startup for Rentify. He wanted to make a company that will give any person the experience of driving the car of their 
                            dreams. Rentify is different from similar competitors because our prices are unmatched, we value customer service above all, every car returned is 
                            toughly cleaned right away and cleaned once more before sending it out again. At Rentify we ensure that we have the best cars for the best price, 
                            and we value our customers more then any other company.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text"><b>Links</b></h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Twitter</a></li>
                                <li><a className="grey-text text-lighten-3" href='https://github.com/ThayanSivathevan/Rentify'>Github</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2020 Rentify Inc.
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default About