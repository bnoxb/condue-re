import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Container,
    Row,
    Col,
    Button,
    Media
} from 'reactstrap';
import './style.css'
import SmallDog from '../images/small-dog-money.png';
import Knives from '../images/knives.png';
import Stromtrooper from '../images/stormtrooper-bartender.png';

const SplashPage = () => {
    return(
        <div className="splash">
            <div className="parallax">
                <div className="splash-content">
                    <Container>
                        <Row className="splash-row">
                            <Col sm="3" md="2"></Col>
                            <Col xs="12" sm="6" md="8">
                            <br/><br/>
                                <h1>Welcome to Condue:RE</h1><br/>
                                <div className="splash-span">
                                    <p> We are a seasonal restaurant working to build bridges through great food, live 
                                        music and good old-fashioned fun.</p>
                                </div>
                                <Link to='/menu'><Button className="splash-btn">See Menu</Button></Link>
                                <Link to='/reservation'><Button className="splash-btn">Make Reservation</Button></Link><br/><br/>
                                <div className="splash-brunch">
                                    <p> Come visit us in the morning on weekends, for <span className="span-brunch">Brunch</span></p><br/><br/>
                                </div>
                            </Col>
                            <Col sm="3" md="2"></Col>
                        </Row>
                    </Container>
                </div>
                <div className="sub-content">
                    <Row>
                        {/* <Col sm="12" className='sub-content' id="info"> */}
                        <Container>
                        <Row>
                            <Col sm="3" md="1"></Col>
                            <Col xs="12" sm="6" md="10" className="sub-header">
                                Here's some more reasons why we're the best!
                                <div className="divider"></div>
                            </Col>
                            <Col sm="3" md="1"></Col>
                        </Row>
                           <Row>
                                <Col xs="2" sm="4">
                                <Row>
                                    <div className="sub-sub-header">
                                        <Media left href="https://www.colorado.gov/pacific/cdle/minimumwage">
                                            <Media object src={SmallDog} className="thumb-image" alt="A small dog with money"/>
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                                We Pay People!!<hr />
                                            </Media>
                                                Here at Condue, we strive to pay our employees minimum wage.  They deserve it because 
                                                without them, there would be no delicious food for you to enjoy.  So for this reason 
                                                we are going to add on a 25% MWF (Minimum Wage Fee) so we can keep paying our employees 
                                                at least a legal minimum!
                                        </Media>
                                    </div>
                                </Row>
                                </Col>
                                <Col xs="2" sm="4">
                                <div className="sub-sub-header">
                                    <Media left href="#">
                                        <Media object src={Knives} className="thumb-image" alt="knives"/>
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                                We Have Equipment!<hr />
                                            </Media>
                                                Condue's motto is: always be prepared.  That's why we have our kitchen fully stocked
                                                with some of today's modern equipment, like knives!  You should be happy that we
                                                have so many knives because otherwise you couldnt buy our food!  Always BE prepared!
                                    </Media>
                                </div>
                                    
                                </Col>
                                <Col xs="2" sm="4">
                                    <div className="sub-sub-header">
                                            <Media left href="#">
                                                <Media object src={Stromtrooper} className="thumb-image" alt="bartender"/>
                                                </Media>
                                                <Media body>
                                                    <Media heading>
                                                        We Don't Discriminate!<hr />
                                                    </Media>
                                                        In Order to stay fresh Condue has to be indiscriminant in it's hiring processes!  We accept
                                                        applicants from any facet of life, we even refuse to do background checks so our
                                                        customers know for a fact that we hire everyone no matter what!  We understand that everyone
                                                        needs to work, no matter how dishonest they are!
                                            </Media>
                                    </div>
                                </Col>
                           </Row>
                        </Container>
                        {/* </Col> */}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;