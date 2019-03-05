import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const EditList = (props) => {
    let date = (new Date(props.res.date)).toDateString();
    if (!props.res.date){
        date = "None";
    }
    return(
        <ListGroup>
            <ListGroupItem className="res-list-item">
                Date: {date}<br/>
            </ListGroupItem>
            <ListGroupItem className="res-list-item">
                Time: {props.res.time}<br/>
            </ListGroupItem>
            <ListGroupItem className="res-list-item">
                Number of Guests: {props.res.numGuests}<br/>
            </ListGroupItem>
            <ListGroupItem className="res-list-item"> 
                Your Notes: {props.res.note}                    
            </ListGroupItem>
        </ListGroup>
    )
}

export default EditList;