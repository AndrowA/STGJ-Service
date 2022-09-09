import React from 'react';
import {Link} from "react-router-dom"


function Nav(props){

    return(
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <Link to="/schedule">
                    <button className="navbar-brand" href="#">Archangel Michael Service </button>
                </Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            {props.status && <Link to="/schedule">
                                                <button className="nav-link" href="#">Schedule</button>
                                            </Link>}
                        </li> */}
                        {/* <li className="nav-item">
                         {props.status && <Link to="/registration">
                                                <button className="nav-link" href="#">Registration</button>
                                            </Link>}
                        </li> */}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/login">
                                <button onClick={props.logOut} className="nav-link" href="#">{props.status ? "Sign Out": "Sign In"}</button>
                            </Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )

}

export default Nav