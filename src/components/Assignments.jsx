import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {collection, addDoc, updateDoc, doc, getDocs, onSnapshot, arrayRemove, arrayUnion} from "firebase/firestore"
import {db} from "../firebaseConfig"
import Table from 'react-bootstrap/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Assignment(props){

    
    const order = doc(db, "order", "allOrderLists");
    const readings = ["Pauline", "Catholic Epistle", "Acts", "Gospel"]

    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var first = 0
    var second = 0
    var third = 0
    var fourth = 0
    var fifth = 0

    var firstSunday = ""

    var secondSunday = ""

    const day = new Date().getDay();
    const month = new Date().getMonth() +1;
    var month1 = new Date().getMonth();
    var month2 = new Date().getMonth();
    const currentYear = new Date().getFullYear();;

    function sundaysInMonth( m, y ) {
        var days = new Date( y,m,0 ).getDate();
        var sundays = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
        for ( var i = sundays[0] + 7; i < days; i += 7 ) {
          sundays.push( i );
        }
        return sundays;
    }

    var sundays = sundaysInMonth(month, currentYear)

    for (var i=0; i<=sundays.length; i++){

        if (i === sundays.length-1 ){
            firstSunday = sundays[i];
            secondSunday = sundaysInMonth(month+1, currentYear)[0];
            console.log(secondSunday)
            month2 +=1
            break
        }

        if (parseInt(sundays[i]) >= day){
            firstSunday = sundays[i]
            secondSunday = sundays[i+1]
            break
        }

    }

    if (parseInt(sundays[sundays.length-1]) < day){
        firstSunday = sundaysInMonth(month+1, currentYear)[0]
        secondSunday = sundaysInMonth(month+1, currentYear)[1]
        month1+=1
    }

    const nameOfMonth1 = months[month1]
    const nameOfMonth2 = months[month2]

    const reset = (name) => {
        if (name === "Altar"){

            // remove all names from the served array
            props.orderList[0].served.forEach((person) => {
                updateDoc(order, {
                    served: arrayRemove(person)
                });
            })
            props.orderList[0].servedPhones.forEach((phone) => {
                updateDoc(order, {
                    servedPhones: arrayRemove(phone)
                });
            })
            // if notRead[0] is in in props first put his name, remove it from the notRead 

            props.orderList[0].notServed.forEach((person) => {
                if ((props.first.find((notServedPerson) => {return notServedPerson.name === person}))&& first <= 1){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        notServed: arrayUnion(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });

                    updateDoc(order, {
                        servedPhones: arrayUnion(props.first.find((notServedPerson) => {return notServedPerson.name === person}).phoneNumber)
                    });

                    console.log("first: " + person)

                    first+=1
                }
            })
            
            // else go on until find one that is in props first

            // same logic for notRead[1,2,3]

            props.orderList[0].notServed.forEach((person) => {
                if ((props.second.find((notServedPerson) => {return notServedPerson.name === person}))&& second <= 1){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        notServed: arrayUnion(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    updateDoc(order, {
                        servedPhones: arrayUnion(props.second.find((notServedPerson) => {return notServedPerson.name === person}).phoneNumber)
                    });
                    
                    console.log("second: " + person)

                    second+=1
                }
            })

            props.orderList[0].notServed.forEach((person) => {
                if ((props.third.find((notServedPerson) => {return notServedPerson.name === person}))&& third <= 1){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        notServed: arrayUnion(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    updateDoc(order, {
                        servedPhones: arrayUnion(props.third.find((notServedPerson) => {return notServedPerson.name === person}).phoneNumber)
                    });

                    console.log("third: " + person)

                    third+=1
                }                
            })

            props.orderList[0].notServed.forEach((person) => {
                if ((props.fourth.find((notServedPerson) => {return notServedPerson.name === person}))&& (fourth <= 3)){
                    updateDoc(order, {
                        notServed: arrayRemove(person)
                    });
                    updateDoc(order, {
                        notServed: arrayUnion(person)
                    });
                    updateDoc(order, {
                        served: arrayUnion(person)
                    });
                    updateDoc(order, {
                        servedPhones: arrayUnion(props.fourth.find((notServedPerson) => {return notServedPerson.name === person}).phoneNumber)
                    });

                    console.log("fourth: " + person)

                    fourth+=1
                }
            })

            // props.resetAltar()
        }

        // if (name === "Readings"){

        //     // remove all names from the read array
        //     props.orderList[0].read.forEach((person) => {
        //         updateDoc(order, {
        //             read: arrayRemove(person)
        //         });
        //     })

        //     props.orderList[0].readPhones.forEach((phone) => {
        //         updateDoc(order, {
        //             readPhones: arrayRemove(phone)
        //         });
        //     })
        //     // if notRead[0] is in in props first put his name, remove it from the notRead 
            
        //     props.orderList[0].notRead.forEach((person) => {
        //         if ((props.first.find((notReadPerson) => {return notReadPerson.name === person}))&& first === 0){
        //             updateDoc(order, {
        //                 notRead: arrayRemove(person)
        //             });
        //             updateDoc(order, {
        //                 read: arrayUnion(person)
        //             });
        //             updateDoc(order, {
        //                 readPhones: arrayUnion(props.first.find((notReadPerson) => {return notReadPerson.name === person}).phoneNumber)
        //             });
        //             first+=1
        //         }
        //     })
        //     // else go on until find one that is in props first

        //     // same logic for notRead[1,2,3]

        //     props.orderList[0].notRead.forEach((person) => {
        //         if ((props.second.find((notReadPerson) => {return notReadPerson.name === person}))&& second === 0){
        //             updateDoc(order, {
        //                 notRead: arrayRemove(person)
        //             });
        //             updateDoc(order, {
        //                 read: arrayUnion(person)
        //             });
        //             updateDoc(order, {
        //                 readPhones: arrayUnion(props.second.find((notReadPerson) => {return notReadPerson.name === person}).phoneNumber)
        //             });
        //             second+=1
        //         }  
        //     })

        //     props.orderList[0].notRead.forEach((person) => {
        //         if ((props.third.find((notReadPerson) => {return notReadPerson.name === person}))&& third === 0){
        //             updateDoc(order, {
        //                 notRead: arrayRemove(person)
        //             });
        //             updateDoc(order, {
        //                 read: arrayUnion(person)
        //             });
        //             updateDoc(order, {
        //                 readPhones: arrayUnion(props.third.find((notReadPerson) => {return notReadPerson.name === person}).phoneNumber)
        //             });
        //             third+=1
        //         }                
        //     })

        //     props.orderList[0].notRead.forEach((person) => {
        //         if ((props.fourth.find((notReadPerson) => {return notReadPerson.name === person}))&& (fourth === 0 || fourth === 1)){
        //             updateDoc(order, {
        //                 notRead: arrayRemove(person)
        //             });
        //             updateDoc(order, {
        //                 read: arrayUnion(person)
        //             });
        //             updateDoc(order, {
        //                 readPhones: arrayUnion(props.fourth.find((notReadPerson) => {return notReadPerson.name === person}).phoneNumber)
        //             });
        //             fourth+=1
        //         }
        //     })

        //     props.resetReading()
        // }

    }

    const findPerson = (index) =>{

        if (props.name === "Altar"){
            if(props.served[0] && props.age === process.env.REACT_APP_ADMIN_AGE)
                return {name:props.served[0][index], phone:props.servedPhones[0][index]}
             else if (props.served[0]){
                return {name:props.served[0][index], phone:null}
             }  else{
                return {name:null, phone:null}
             }
        }

        // if (props.name === "Readings"){
        //     // Undo this when have enough users
        //     //return props.read[0] && props.user.email === process.env.REACT_APP_ADMIN_EMAIL ? readings[index] + " → " + props.read[0][index] + ": \n" +  props.readPhones[0][index]: props.read[0] || props.read[0]? readings[index] + " → " + props.read[0][index]:null
        //     return readings[index] + " → TBA" 
        // }
    }

    const row1 = props.served[0] && props.age === process.env.REACT_APP_ADMIN_AGE?[{sunday:nameOfMonth1 + " " + firstSunday + ", " + currentYear, elementary1: findPerson(0).name, elementary2: findPerson(2).name, highSchool: findPerson(4).name, adult: findPerson(6).name, responsable: findPerson(8).name},
    {sunday:"Phone Numbers", elementary1: findPerson(0).phone, elementary2: findPerson(1).phone, highSchool: findPerson(2).phone, adult: findPerson(3).phone, responsable: findPerson(4).phone}]:
    [{sunday:nameOfMonth1 + " " + firstSunday + ", " + currentYear, elementary1: findPerson(0).name, elementary2: findPerson(0).name, highSchool: findPerson(1).name, adult: findPerson(2).name, responsable: findPerson(3).name}]

    const row2 = props.served[0] && props.age === process.env.REACT_APP_ADMIN_AGE?[{sunday:nameOfMonth2 + " " + secondSunday + ", " + currentYear, elementary1: findPerson(1).name, elementary2: findPerson(3).name, highSchool: findPerson(5).name, adult: findPerson(7).name, responsable: findPerson(9).name},
    {sunday:"Phone Numbers", elementary1: findPerson(1).phone, elementary2: findPerson(0).phone, highSchool: findPerson(1).phone, adult: findPerson(2).phone, responsable: findPerson(3).phone}]:
    [{sunday:nameOfMonth2 + " " + secondSunday + ", " + currentYear, elementary1: findPerson(0).name, elementary2: findPerson(0).name, highSchool: findPerson(1).name, adult: findPerson(2).name, responsable: findPerson(3).name}]

    return(
        // Here would have to take 4 names from read and 4 names from served
        
        <div>
        <div className='assignement-top-compartment'>
        <Row>
            <Col className='assignment-table-title'>
                <h2>Altar Assignments</h2>
            </Col>
            <Col className='assignement-button'>
                {props.user.email === process.env.REACT_APP_ADMIN_EMAIL? <Button onClick={() => reset(props.name)} class="btn btn-primary" type="button">Assign {props.name}</Button>: null}
            </Col>
        </Row>
            
        </div>

        <TableContainer component={Paper} className='assignement-table'>
            <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize:"20px"}}></TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Responsable</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Adult</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>High School</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Elementary</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Elementary</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {row1.map((row) => (
                        <TableRow
                        key={row.sunday}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell component="th" scope="row" sx={{fontSize:"20px", fontFamily: 'EB Garamond', fontWeight: 'bold'}}>
                            {row.sunday}
                        </TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.elementary1}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.elementary2}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.highSchool}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.adult}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.responsable}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <TableContainer component={Paper} className='assignement-table'>
            <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize:"20px"}}></TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Responsable</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Adult</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>High School</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Elementary</TableCell>
                    <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>Elementary</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {row2.map((row) => (
                        <TableRow
                        key={row.sunday}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell component="th" scope="row" sx={{fontSize:"20px", fontFamily: 'EB Garamond', fontWeight: 'bold'}}>
                            {row.sunday}
                        </TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.elementary1}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.elementary2}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.highSchool}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.adult}</TableCell>
                        <TableCell align="left" sx={{fontSize:"20px", fontFamily: 'EB Garamond'}}>{row.responsable}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
          
        </div>
    )
             
}

export default Assignment