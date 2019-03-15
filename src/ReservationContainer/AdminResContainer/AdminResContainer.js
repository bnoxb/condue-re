import React, { Component } from 'react';
import Calendar from './Calendar/Calendar';
import { 
    Container,
    Row,
    Col,
} from 'reactstrap';
import "./style.css";

class AdminResContainer extends Component {
    render(){
        return(
            <Container>
                <Row className="calendar-row">
                    <Col md="12">
                        <h1>Current Reservations</h1>
                        <p>The days marked with red have reservations that need to be accepted.</p>
                        <Calendar reses={this.props.reses} getRes={this.props.getRes}/>
                    </Col>
                    <Col md="0"></Col>
                </Row>
            </Container>
        )
    }
};

export default AdminResContainer;