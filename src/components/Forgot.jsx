import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Routes, Route, useNavigate} from "react-router-dom"
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebaseConfig"

function Forgot(props){

    const [email, setEmail] = useState("");
    const [error, setError] = useState("")

    const forgot = async (forgotenEmail) => {
        try{
          console.log(forgotenEmail)
          await sendPasswordResetEmail(auth, forgotenEmail)
          return setError("An email has been sent to reset your password! Please look in your junk box if you cannot find it.")
        }catch(error){
            
            return setError("Please enter a valid Email!")
            console.log(error.message)
        }
      }

    return(
       <div className="login-card">
            <Form className="text-center">
                <h1>Reset Password</h1>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="login-input">
                        <Form.Control  type="email" placeholder="Enter email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                        {error === "An email has been sent to reset your password! Please look in your junk box if you cannot find it." ? <p Style="padding: 10px 0px 0px 2px; color:#28a745; text-align:left; margin: 0px;"> {error} </p>: error === "Please enter a valid Email!" ? <p Style="padding: 10px 0px 0px 2px; color:#cc0000; text-align:left; margin: 0px;"> {error} </p>: null}
                    </div>
                    
                </Form.Group>
                <div class="d-grid gap-2">
                    <button onClick={()=>forgot(email)} class="btn btn-primary" type="button">Send Email</button>
                </div>
            </Form>
        </div>
    )
}

export default Forgot