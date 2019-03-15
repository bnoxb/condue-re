import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import ChatContainer from './ChatContainer/ChatContainer';
import { Media } from 'reactstrap';
import King from '../images/kingsoopers.png';
import './style.css';

class About extends Component {
    constructor(){
        super();
        this.state = {
            showChat: false,
            showError: false,
        }
    }

    componentDidMount(){
        if(this.props.userLogged){
            this.setState({
                showError: false,
            })
        }
    }

    showChat = () => {
        if(this.props.userLogged){
            this.setState({
                showChat: true,
                showError: false,
            });
        }else {
            this.setState({
                showError: true,
            })
        }
    }

    hideChat = () => {
        this.setState({
            showChat: false,
            showError: false,
        });
    }

    render(){
        return(
            <div className="about">
                <Container className="about-content">
                    <Row>
                        <Col></Col>
                        <Col>
                            <div className="about-head">
                                <h1>About Condue</h1><br/>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <div className="about-divider"></div>
                    </Row>
                    <Row>
                    <Container>
                        <Row>
                            <Col sm="3" md="1"></Col>
                            <Col xs="12" sm="6" md="10">
                                <div className="about-parralax">
                                    <div className="about-overlay">
                                        ~ making food for people for money ~
                                    </div>
                                </div>
                            </Col>
                            <Col sm="3" md="1"></Col>
                        </Row>
                        <Row>
                            <div className="about-divider" id="bottom"></div><br/><br/><br/>
                        </Row>
                    </Container>
                        <Container>
                            <Row>
                                <Col xs="0" sm="0" md="2"></Col>
                                <Col sm="3" md="6"><div className="about-sub-header">
                                        <Media left>
                                            <Media object src={King} className="thumb-image" alt="A small dog with money"/>
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                                Where do we get our ingredients?<hr />
                                            </Media>
                                                Only the freshest ingredients are good enough to be a part of Condue.  Having only the freshest ingredients
                                                ensures that our food is of the best quality!  We source our produce from farmers and growers through King Soopers.
                                        </Media>
                                    </div>
                                </Col>
                                <Col xs="0" sm="2" md="4"></Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    <div className="about-contact-header">
                                        <h2>
                                            If you want to reach out...
                                        </h2>
                                    </div>
                                </Col>
                                <Col md="4"></Col>
                            </Row>
                            <Row>
                                <Col md="4"></Col>
                                <Col  md="4">
                                    <div className="about-join-chat">
                                        {this.state.showError 
                                            ? <p>You need to Login to do that...</p>
                                            : this.state.showChat 
                                                ? <Button>Close Chat</Button> 
                                                : <Button onClick={this.showChat}>Join Live Chat</Button> 
                                        }
                                    </div>
                                </Col>
                                <Col md="4"></Col>
                            </Row>
                            {this.state.showChat 
                                ?   <ChatContainer userName={this.props.userName}/> 
                                :   null
                            }<br/><br/>
                        </Container>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default About;