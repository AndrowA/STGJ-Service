import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {collection, addDoc, updateDoc, doc, getDocs, onSnapshot, arrayRemove, arrayUnion} from "firebase/firestore"
import {db} from "../firebaseConfig"

function Assignment(props){

    const order = doc(db, "order", "allOrderLists");

    var first = 0
    var second = 0
    var third = 0
    var fourth = 0

    const reset = (name) => {
        if (name === "Altar"){

            // remove all names from the served array
            props.orderList[0].served.forEach((person) => {
                updateDoc(order, {
                    served: arrayRemove(person)
                });
            })
            // if notRead[0] is in in props first put his name, remove it from the notRead 
            
            props.orderList[0].notServed.forEach((person) => {
                if ((props.first.find((notServedPerson) => {return notServedPerson.name === person}))&& first === 0){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    first+=1
                }
                
            })
            // else go on until find one that is in props first

            // same logic for notRead[1,2,3]

            props.orderList[0].notServed.forEach((person) => {
                if ((props.second.find((notServedPerson) => {return notServedPerson.name === person}))&& second === 0){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    second+=1
                }
                
            })

            props.orderList[0].notServed.forEach((person) => {
                if ((props.third.find((notServedPerson) => {return notServedPerson.name === person}))&& third === 0){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    third+=1
                }
                
            })

            props.orderList[0].notServed.forEach((person) => {
                if ((props.fourth.find((notServedPerson) => {return notServedPerson.name === person}))&& (fourth === 0 || fourth === 1)){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    fourth+=1
                }
                
            })

            props.resetAltar()
        }

        if (name === "Readings"){

            // remove all names from the read array
            props.orderList[0].read.forEach((person) => {
                updateDoc(order, {
                    read: arrayRemove(person)
                });
            })
            // if notRead[0] is in in props first put his name, remove it from the notRead 
            
            props.orderList[0].notRead.forEach((person) => {
                if ((props.first.find((notReadPerson) => {return notReadPerson.name === person}))&& first === 0){
                    updateDoc(order, {
                        notRead: arrayRemove(person)
                    });
                    updateDoc(order, {
                        read: arrayUnion(person)
                    });
                    first+=1
                }
                
            })
            // else go on until find one that is in props first

            // same logic for notRead[1,2,3]

            props.orderList[0].notRead.forEach((person) => {
                if ((props.second.find((notReadPerson) => {return notReadPerson.name === person}))&& second === 0){
                    updateDoc(order, {
                        notRead: arrayRemove(person)
                    });
                    updateDoc(order, {
                        read: arrayUnion(person)
                    });
                    second+=1
                }
                
            })

            props.orderList[0].notRead.forEach((person) => {
                if ((props.third.find((notReadPerson) => {return notReadPerson.name === person}))&& third === 0){
                    updateDoc(order, {
                        notRead: arrayRemove(person)
                    });
                    updateDoc(order, {
                        read: arrayUnion(person)
                    });
                    third+=1
                }
                
            })

            props.orderList[0].notRead.forEach((person) => {
                if ((props.fourth.find((notReadPerson) => {return notReadPerson.name === person}))&& (fourth === 0 || fourth === 1)){
                    updateDoc(order, {
                        notRead: arrayRemove(person)
                    });
                    updateDoc(order, {
                        read: arrayUnion(person)
                    });
                    fourth+=1
                }
                
            })

            props.resetReading()
        }

    }

    const findPerson = (index) =>{

        if (props.name === "Altar"){
             return props.served[0] ? props.served[0][index]: null
        }

        if (props.name === "Readings"){
             return props.read[0] ? props.read[0][index]: null
        }
    }

    return(
        // Here would have to take 4 names from read and 4 names from served
        <Col sml={8.5} className="main-boxes">
            {props.user.email === process.env.REACT_APP_ADMIN_EMAIL? <Button onClick={() => reset(props.name)} class="btn btn-primary" type="button">Assign {props.name}</Button>: <h1>{props.name}</h1>}
            <ul>
                <li className="main-list">{findPerson(0)}</li>
                <li className="main-list">{findPerson(1)}</li>
                <li className="main-list">{findPerson(2)}</li>
                <li className="main-list">{findPerson(3)}</li>
            </ul>
        </Col> 
    )
             
}

export default Assignment