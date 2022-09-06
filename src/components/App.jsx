import React from 'react';
import Nav from './Nav'
import Login from './Login'
import Register from './Registration';
import Forgot from "./Forgot"
import { useState } from 'react';
import Main from './Main';
import {auth} from "../firebaseConfig"
import Availability from './Availability';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import {collection, addDoc, updateDoc, doc, getDocs, onSnapshot, arrayRemove, arrayUnion} from "firebase/firestore"
import {db} from "../firebaseConfig"


function App() {

  // Other Data
  const Users = collection(db, "users")
  const Order = collection(db, "order")

  //Authentication
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState("")

  // Authentication
  const [user, setUser] = useState({});
  
  const [userList, setUserList] = useState([])
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    onSnapshot(Users, data => {
      setUserList(data.docs.map( doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      }))
    })

    onSnapshot(Order, data => {
      setOrderList(data.docs.map( doc => {
        return{
          id: doc.id,
          ...doc.data()
        }
      }))
    })

  },[])
  
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser){setLoggedIn(true)}
    else{
      setLoggedIn(false)
    }
    setUser(currentUser);
  });

  const signIn = async (loginEmail, loginPassword) => {
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        window.location.pathname = ('/schedule')
    }catch(error){
        console.log(error.message)
        setError("* Email or password incorrect!")
    }
  }

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <Router>
      <Nav status={loggedIn} logOut = {logout}/>
      <Routes>
        <Route path="/login" element={<Login signIn={signIn} error={error}/>}/>
        <Route element={<ProtectedRoute loggedIn= {loggedIn} signIn={signIn} error={error}/>}>
          <Route path="/schedule" element={<Main user = {user} userList={userList} orderList={orderList}/>}/>
          <Route path="/registration" element={<Availability userList= {userList} user= {user} />}/> 
          <Route path="/" element={<Main user = {user} userList={userList} orderList={orderList}/>}/>
        </Route>
        <Route path="/register" element={<Register error={error}/>}/>
        <Route path="/forgot" element={<Forgot error={error}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

