import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';

const Footer = () => {
    return(
        <div className="footer-main">
            <Container>
                <Row>
                    <Col md="12">
                        <div className="footer-divider"></div>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col md="4">
                    <span id="email">rob.martin.dev@gmail.com</span><br/>
                </Col>
                <Col md="4" style={{ textAlign:"center" }}>
                    <a href="http://www.rob-dev.com">My Portfolio Site</a>
                </Col>
                <Col md="4" style={{ textAlign:"right", padding:"1rem" }}>
                    <a href="https://www.linkedin.com/in/robert-martin-developer/" className="fa fa-linkedin" id="linkedin" target='_blank'> </a>
                    <a href="https://www.github.com/bnoxb" className="fa fa-github" id="github" target='_blank' rel='noopener noreferrer'> </a>    
                </Col>
            </Row>
        </div>
    )
}

export default Footer;