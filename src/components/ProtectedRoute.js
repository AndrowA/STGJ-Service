import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './Login'
import {Outlet} from "react-router"

function ProtectedRoute(props){
    return props.loggedIn ? <Outlet/>: <Login signIn={props.signIn} error={props.error}/>
}

export default ProtectedRoute