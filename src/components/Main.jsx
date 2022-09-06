import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Assignment from './Assignments';
import {collection, addDoc, updateDoc, doc, getDocs, onSnapshot, arrayRemove, arrayUnion} from "firebase/firestore"
import {db} from "../firebaseConfig"

function Main(props){

    const order = doc(db, "order", "allOrderLists");

    const [paulineList, setPaulineList] = useState([])
    const [catholicList, setCatholicList] = useState([])
    const [actsList, setActsList] = useState([])
    const [gospelList, setGospelList] = useState([])

    const [AASundaySchool, setAASundaySchool] = useState([])
    const [youths, setYouths] = useState([])
    const [adults, setAdults] = useState([])

    const [read, setRead] = useState([])
    const [served, setServed] = useState([])
    const [readPhones, setReadPhones] = useState([])
    const [servedPhones, setServedPhones] = useState([])

   useEffect(() => {

    // Using the data:
  
      setPaulineList(props.userList.filter( (doc) => {
        return doc.Pauline === true
      }))
      
      setCatholicList(props.userList.filter( (doc) => {
        return doc.Catholic === true
      }))
  
      setActsList(props.userList.filter( (doc) => {
        return doc.Acts === true
      }))
  
      setGospelList(props.userList.filter( (doc) => {
        return doc.Gospel === true
      }))
      
      setAASundaySchool(props.userList.filter( (doc) => {
        return doc.age === "AASundaySchool" && doc.Altar === true
      }))

      setYouths(props.userList.filter( (doc) => {
        return doc.age === "Youth" && doc.Altar === true
      }))

      setAdults(props.userList.filter( (doc) => {
        return doc.age === "Adult" && doc.Altar === true
      }))

      setRead(props.orderList.map((doc) => {
        return doc.read
      }))

      setServed(props.orderList.map((doc) => {
        return doc.served
      }))
      
      setReadPhones(props.orderList.map((doc) => {
        return doc.readPhones
      }))

      setServedPhones(props.orderList.map((doc) => {
        return doc.servedPhones
      }))

   },[props.orderList])

  const resetReadings = async () => {
    props.orderList[0].read.forEach((person) => {
      updateDoc(order, {
          read: arrayRemove(person)
      });
    }, [props.orderList])

    props.userList.forEach(user => {
         updateDoc(order, {
            notRead: arrayUnion(user.name)
        });
    }); 
  }

  const resetAltar = async () => {
    props.orderList[0].served.forEach((person) => {
      updateDoc(order, {
          served: arrayRemove(person)
      });
    })

    props.userList.forEach(user => {
        if (!props.orderList[0].notServed.find((notServedPerson) => {return notServedPerson === user}))
         updateDoc(order, {
            notServed: arrayUnion(user.name)
        });
    }); 
  }

  return(
      <Container className="text-center">
          <Row className="main-row">
            <Col>
              <Assignment name = "Altar" first={adults} second={youths} third={AASundaySchool} fourth={AASundaySchool} user = {props.user} orderList = {props.orderList} read = {read} served = {served} resetAltar={resetAltar} readPhones={readPhones} servedPhones={servedPhones}/>
              {props.user.email === process.env.REACT_APP_ADMIN_EMAIL?<Button onClick={()=>resetAltar()} class="btn btn-primary" type="button">Reset Altar</Button>:null}
            </Col>
            <Col>
              <Assignment name = "Readings" first={paulineList} second={catholicList} third={actsList} fourth={gospelList} user = {props.user} orderList = {props.orderList} read = {read} served = {served} resetReading={resetReadings} readPhones={readPhones} servedPhones={servedPhones}/>
              {props.user.email === process.env.REACT_APP_ADMIN_EMAIL?<Button onClick={()=>resetReadings()} class="btn btn-primary" type="button">Reset Readings</Button>:null}
            </Col>
          </Row>
      </Container>
  )
}


export default Main