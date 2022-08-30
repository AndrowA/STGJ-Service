import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceCard from './Card';
import {collection, updateDoc, doc, getDocs, query, where} from "firebase/firestore"
import {db} from "../firebaseConfig"

function Availability(props){

    const [Altar, setAltar] = useState(false)
    const [Catholic, setCatholic] = useState(false)
    const [Pauline, setPauline] = useState(false)
    const [Acts, setActs] = useState(false)
    const [Gospel, setGospel] = useState(false)
    const [id, setId] = useState()


    // As soon as I can query properly gg 
    useEffect(() => {
        const Category = (field) => {
            props.userList.forEach((user) => {
                if (user.email === props.user.email){
                    setAltar(user.Altar)
                    setCatholic(user.Catholic)
                    setPauline(user.Pauline)
                    setActs(user.Acts)
                    setGospel(user.Gospel)
                    setId(user.id)
                }
            })
        }
        Category()
        
      })
    
    return(
        <Container className="text-center">
        <Row className='card-groups'>
            <Col sm className='card-piece'>
                <PlaceCard title="Altar Service" img="https://live.staticflickr.com/3428/3941955786_68ff59cfb3_b.jpg" value="0" id="Altar" checked={Altar} user={props.user} userList={props.userList} userID={id}/>
            </Col>
            
            <Col sm className='card-piece'>
                <PlaceCard title="Pauline Epistle Reading" img="https://saintgeorgechurch.org.au/wp-content/uploads/2021/09/St-Paul.jpg" value="1" id="Pauline" checked={Pauline}  user={props.user} userList={props.userList} userID={id}/>
            </Col>

            <Col sm className='card-piece'>
                <PlaceCard title="Catholic Epistle Reading" img="https://images.squarespace-cdn.com/content/v1/5537d482e4b0cda0deb18bb7/1605580875065-R4F1ISMCZ8ROG9G5WXZY/nativity.jpg" value="2" id="Catholic" checked={Catholic} user={props.user} userList={props.userList} userID={id}/>
            </Col>

        </Row>
        <Row>
            <Col sm className='card-piece-bottom'>
                <PlaceCard title="Acts Reading" img="https://i.etsystatic.com/23754934/r/il/a1cbd1/3487387271/il_fullxfull.3487387271_gt3n.jpg" value="3" id="Acts" checked={Acts}  user={props.user} userList={props.userList} userID={id}/>
            </Col>
            
            <Col sm className='card-piece-bottom'>
                <PlaceCard title="Gospel Reading" img="https://www.watermarkchurch.hk/wp-content/uploads/2019/10/SermonSeries_Graphics_16to9_onlineGraphic-1080x675.jpg" value="4" id="Gospel" checked={Gospel}  user={props.user} userList={props.userList} userID={id}/>
            </Col>
        </Row>
    </Container>
    )
}

export default Availability