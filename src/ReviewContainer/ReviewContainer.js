import React, { Component } from 'react';
import ReviewNew from './ReviewNew/ReviewNew';
import ReviewList from './ReviewList/ReviewList';
import { Button, ListGroup, Container, Row, Col } from 'reactstrap';
import './style.css';

class ReviewContainer extends Component {
    constructor(){
        super();

        this.state ={
            reviews: [],
            newReview: {
                name: '',
                stars: 0,
                note: '',
            },
            showModal: false,
            showError: false,
        }
    }

    componentDidMount(){
        this.getReviews();
        if(this.props.userLogged){
            this.setState({
                newReview:{
                    ...this.state.newReview,
                    name: this.props.userName
                }
            })
        }
    }

    showModal = () => {
        if(this.props.userLogged){
            this.setState({
                showModal: !this.state.showModal,
                showError: false,
            });
        }else {
            this.setState({
                showError: true,
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            newReview: {
                ...this.state.newReview,
                [e.target.name]: e.target.value,
            }
        })
    }

    getReviews = async () => {
        try{
            const reviewResponse = await fetch(process.env.REACT_APP_BACKEND + 'api/v1/reviews');
            if(!reviewResponse) {
                throw Error(reviewResponse.statusText);
            }
            const parsedReviews = await reviewResponse.json();
            this.setState({
                reviews: parsedReviews.data,
            })
        }catch(err){
            console.log(err);
        }
    }

    newReview = async (e) => {
        e.preventDefault();
        try{
            const newRevResponse = await fetch((process.env.REACT_APP_BACKEND + 'api/v1/reviews'), {
                method: "POST",
                body: JSON.stringify(this.state.newReview),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(!newRevResponse.ok){
                throw Error(newRevResponse.statusText);
            }
            const parsedResponse = await newRevResponse.json();
            this.setState({
                showModal: false,
                reviews: [
                    ...this.state.reviews,
                    parsedResponse.data,
                ]
            })
        }catch(err){
            console.log(err);
        }
    }

    render() {
        const reviewList = this.state.reviews.map((review, i)=>{
            return(
                <ReviewList key={i} review={review}/>
            )
        })
        return(
            <div className="reviews">
                <Container>
                    <Row>
                        <Col md="12">
                            <div id="review-head">
                                <h1>Rate Condue</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="reviews-sub-head">
                            <Col md="4"></Col>
                            <Col md="4">
                                {this.state.showError ? <p>You Need to login to do that...</p> : <Button onClick={this.showModal}>Make New Review</Button>}
                            </Col>
                            <Col md="4"></Col>
                    </Row>
                </Container>
                <Container className="reviews-list">
                    <ListGroup>
                        {reviewList}
                    </ListGroup>
                    {this.state.showModal ? <ReviewNew handleInput={this.handleInput} showModal={this.state.showModal} newReview={this.newReview} />: null}
                </Container>
            </div>
        )
    }
}

export default ReviewContainer;