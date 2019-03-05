import React from 'react';

const ReviewNew = (props) => {
    return(
        <div>
            <form onSubmit={props.newReview}>
                <label>
                    Your Name:
                    <input type="text" name="name" onChange={props.handleInput} />
                </label>
                <label>
                    Review:
                    <input type="text" name="note" onChange={props.handleInput} />
                </label>
                <label>
                    Stars:
                    <input type="number" name="stars" onChange={props.handleInput} />
                </label>
                <input type="Submit" />
            </form>
        </div>
    )
}

export default ReviewNew;