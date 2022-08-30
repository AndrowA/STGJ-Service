import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Routes, Route, useNavigate} from "react-router-dom"



function Forgot(props){

    const [email, setEmail] = useState("");

    return(
       <div className="login-card">
            <Form className="text-center">
                <h1>Reset Password</h1>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="login-input">
                        <Form.Control  type="email" placeholder="Enter email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    
                </Form.Group>
                <div class="d-grid gap-2">
                    <button onClick={()=>props.forgot(email)} class="btn btn-primary" type="button">Send Email</button>
                </div>
            </Form>
        </div>
    )
}

export default Forgot