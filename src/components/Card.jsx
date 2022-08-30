import React , {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {updateDoc, doc} from "firebase/firestore"
import {db} from "../firebaseConfig"


function PlaceCard(props){

    const updateDatabase = async (field) => {
        const userDoc = doc(db, "users", props.userID)
        const newFields = {[props.id]: !props.checked}
        await updateDoc(userDoc, newFields)
    }
    

    return(
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
            </Card.Body>
        
            <Card.Body>
            <div className="d-grid gap-2">
            <ToggleButton
                onClick={props.category}
                className="mb-2"
                id={props.id}
                type="checkbox"
                variant="outline-primary"
                checked={props.checked}
                value={props.checked}
                onChange={()=>updateDatabase(props.id)}
            >{props.checked ? "Registered" :"Register"}
            </ToggleButton>
            </div>
            
        
            </Card.Body>
        </Card>  
    )
}
export default PlaceCard