import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import "./style.css";

const Menu = (props) => {
    return(
        <div className="menu">
            <Container>
                <Row>
                    <Col md="12" style={{textAlign:"center"}}>
                        <h1>Starters</h1>
                    </Col>
                </Row>
                <Row>
                    <div className="menu-divider"></div><br/><br/><br/>
                </Row>
                <Row>
                    <Col md="12" style={{textAlign:"left"}}>
                        <h4>String Cheese</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <p>It's Everybody's favorite appetizer! Just peel away small mozzarella strings from this larger mozzarella cylinder! MMMM </p><br/>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md="12" style={{textAlign:"center"}}>
                        <h1>Entrees</h1>
                    </Col>
                </Row>
                <Row>
                    <div className="menu-divider"></div><br/><br/><br/>
                </Row>
                <Row>
                    <Col md="12" style={{textAlign:"left"}}>
                        <h4>Hot Dog Tornado</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <p>It's Everybody's Favorite way to eat a hot dog!!  A hot dog on a stick with a tornado of croissant spiraling up like a tornado!
                            DEEEELISH!
                        </p><br/>   
                    </Col>
                    <Col md="4"></Col>
                </Row>
                <Row>
                    <Col md="12" style={{textAlign:"left"}}>
                        <h4>Sloppy Joe</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <p>Mystery Meat and a delicious ketchup based sauce.  What more can you want?
                        </p><br/>   
                    </Col>
                    <Col md="4"></Col>
                </Row>
                <Row>
                    <Col md="12" style={{textAlign:"left"}}>
                        <h4>Dinosaur Nuggets</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <p>Chicken Nuggets, formed using the latest techniques developed by the best chefs.  You're never too old to eat a dinosaur shaped chicken nugget!
                        </p><br/>   
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
                

        </div>
    )
};

export default Menu;