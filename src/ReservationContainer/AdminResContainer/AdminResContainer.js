import React, { Component } from 'react';
import Calendar from './Calendar/Calender';
import { 
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import "./style.css";

class AdminResContainer extends Component {
    render(){
        return(
            <Container>
                <Row className="calendar-row">
                    <Col md="12">
                        <h1>Im Admin Container!</h1>
                        <Calendar reses={this.props.reses} getRes={this.props.getRes}/>
                    </Col>
                    <Col md="0"></Col>
                </Row>
            </Container>
           
        )
    }
};

export default AdminResContainer;