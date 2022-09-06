import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import {Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import {auth} from "../firebaseConfig"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {collection, addDoc, updateDoc, doc, getDocs, onSnapshot, arrayRemove, arrayUnion} from "firebase/firestore"
import {db} from "../firebaseConfig"

function Register(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("")
    const order = doc(db, "order", "allOrderLists");
    const Users = collection(db, "users")

    const registration = async (registerEmail, registerPassword, confirmPassword, name, age, phone) => {
        
        if (registerPassword !== confirmPassword){
          return setError("Passwords do not match, please try again!")
        }
    
        if (registerEmail === ""||registerPassword === ""||confirmPassword === ""||name === ""||age === ""||phone === ""){
          return setError("Please fill in all the fields!")
        }

        if (registerPassword.length < 6){
            return setError("Please enter a password with a minimum of 6 characters!")
        }
    
        try{
             const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
             await addDoc(Users, {email: registerEmail, name: name, age: age, Acts:false, Altar: true, Catholic: false, Gospel: false, Pauline: false, phoneNumber:phone})
             await updateDoc(order, {
               notRead: arrayUnion(name)
             });
             await updateDoc(order, {
               notServed: arrayUnion(name)
             });
             window.location.pathname = ('/schedule')
         }
        catch(error){
           setError("* Please enter a valid email address!")
         }
      }

    return(
        
        <div className="registration">
            <div className="login-card">
            <Form className="text-center">
                <h1>Register</h1>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="login-input">
                        <Form.Control  type="email" placeholder="Full Name" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </div>
                    <div className="login-input">
                        <Form.Control  type="email" placeholder="Email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="login-input">
                    <Form.Select  type="name" placeholder="Age" value={age} onChange={(e) => {setAge(e.target.value)}}>
                        <option value="">Select your age group</option>
                        <option value="AASundaySchool">AASundaySchool</option>
                        <option value="Youth">Youth</option>
                        <option value="Adult">Adult</option>
                    </Form.Select>
                    </div>
                    <div className="login-input">
                    <Form.Control  type="tel" placeholder="Phone Number" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }}/>
                    </div>
                    <div className="login-input">
                    <Form.Control  type="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <div className="login-input">
                    <Form.Control  type="password" placeholder="Re-enter password" value={password2} onChange={(e) => {
                            setPassword2(e.target.value)
                        }}/>
                    </div>
                    </Form.Group>
                    {error !== "" ? <p Style="padding: 0px 0px; color:#cc0000; text-align:left;"> {error} </p>: null}
                <div class="d-grid gap-2">
                    <button onClick={()=>registration(email,password, password2, name, age, phone)} class="btn btn-primary" type="button">Register</button>
                </div>
                
                <Link to="/login" Style="text-decoration: none;">
                    <p Style=" padding: 0px; margin: 40px 0 20px 0">Already have an account? Login</p>
                </Link>
            </Form>
        </div>
        </div>

    )
}

export default Register