import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Routes, Route, useNavigate} from "react-router-dom"

function Login(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
       <div className="login-card">
            <Form className="text-center">
                <img className="login-image" src="https://i.etsystatic.com/23754934/r/il/7bd6be/2845622712/il_1588xN.2845622712_1zh0.jpg" alt="" />
                <h2>Archangel Michael Deaconship Service</h2>
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="login-input">
                        <Form.Control  type="email" placeholder="Enter email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="login-input">
                    <Form.Control  type="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </div>
                        
                    {props.error !== "" ? <p Style="padding: 0px 0px; color:#cc0000; text-align:left;"> {props.error} </p>: null}
                </Form.Group>
                <div class="d-grid gap-2">
                    <button onClick={()=>props.signIn(email,password)} class="btn btn-primary" type="button">Sign In</button>
                </div>
                <Link to="/register" Style="text-decoration: none;">
                    <p Style="padding: 0px; margin: 40px 0 30px 0">Create an account? Sign Up </p>
                </Link>
                <Link to="/forgot" Style="text-decoration: none;">
                    <p Style="padding: 0px;">Forgot Password? </p>
                </Link>
            </Form>
        </div>
    )
}

export default Login