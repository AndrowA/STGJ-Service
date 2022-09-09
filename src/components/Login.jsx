import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Main from './Main';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Routes, Route, useNavigate} from "react-router-dom"

function Login(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <Container className="text-center login-card">
        <h1 className='login-title'>Archangel Michael Deaconship Service</h1>
        <Row>
            <Col className='login-left-compartment'>
                
                <img className="login-image" src="https://archangelmichaeloc.org/wp-content/uploads/2018/04/15259788_1365204300164729_5431437382166434887_o-copy.png" alt="" />
            </Col>
            <Col className="login-right-compartment">
                <div>
                    <Form className="text-center">
                        <h3>Login</h3>
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
            </Col>
        </Row>
            
        </Container>
       
    )
}

export default Login