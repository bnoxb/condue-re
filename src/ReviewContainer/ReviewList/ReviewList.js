import React from 'react';
import { ListGroupItem } from 'reactstrap';
import "../style.css";

const ReviewList = (props) => {
    return(
        <ListGroupItem className="reviews-list-item">
            <h1>{props.review.name}</h1>
            <p>Stars: {props.review.stars}</p>
            <p>Review: {props.review.note}</p>
        </ListGroupItem>
    )
}

export default ReviewList;