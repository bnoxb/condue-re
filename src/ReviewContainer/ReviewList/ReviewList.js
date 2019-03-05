import React from 'react';

const ReviewList = (props) => {
    return(
        <div>
            <h1>{props.review.name}</h1>
            <p>Stars: {props.review.stars}</p>
            <p>Review: {props.review.note}</p>
        </div>
    )
}

export default ReviewList;