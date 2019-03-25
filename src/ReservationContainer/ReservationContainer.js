import React, { Component } from 'react';
import EditResContainer from './EditResContainer/EditResContainer';
import { 
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import './style.css';
import AdminResContainer from './AdminResContainer/AdminResContainer';
import CalendarCreate from './CalendarCreate/CalendarCreate';


class ReservationContainer extends Component {
    constructor() {
        super();

        this.state = {
            reses: [],
            resName: '',
            showCreateModal: false,
            showResList: false,
            showError11000: false,
            showNotLogged: true,
            // REMOVE TESTING AFTER TESTING
            // testing:true
        }
    }
    
    componentDidMount=()=>{
        if(this.props.userLogged){
            this.setState({
                resName: this.props.user.name,
                showNotLogged: false,
            })
        }
        this.getRes();
        if(this.props.passTargetDate){
            this.setState({
                showCreateModal: true,
            })
        }

    }

    getRes = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND + 'api/v1/reservations');
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsedResponse = await response.json();
            this.setState({
                reses: parsedResponse.data
            })
        }catch(err){
            console.log(err);
        }
    }

    addRes = async (res) => {
        console.log('in the add res with:', res);
        try{
            const resResponse = await fetch((process.env.REACT_APP_BACKEND + 'api/v1/reservations'), {
                method: 'POST',
                body: JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!resResponse.ok){
                throw Error(resResponse.statusText);
            }

            const parsedRes = await resResponse.json();

            if(parsedRes.status === 11000){
                this.setState({
                    showError11000: true,
                })
            } else if (parsedRes.status === 200) {
                this.setState({
                    reses: [
                        ...this.state.reses,
                        parsedRes.data
                    ],
                    showCreateModal: false,
                    resName: res.name,
                    showResList: true,
                    showError11000: false,
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    showCreateModal = () => {
        if(this.props.userLogged){
            this.setState({
                showCreateModal: true,
                showResList: false,
            })
        } else {
            this.setState({
                showNotLogged: true,
            })
        }
    }

    showResList = () => {
        this.setState({
            showResList: true,
            showCreateModal: false,
        })
    }

    handleCancelModal = () => {
        this.setState({
            showCreateModal: false,
        })
    }

    handleDeleteRes = async (id) => {
        
        const newReses = this.state.reses.filter((res)=> res._id !== id );
            await this.setState({
                reses: newReses,
            })
    }
    render(){

        return(
            <div>
                <div className="parallaxRes">
                    <div className="res-content">
                    {/* CHANGE THIS BACK TO this.props.logged AFTER TESTING */}
                    {this.props.logged ?
                        <AdminResContainer reses={this.state.reses} getRes={this.getRes}/> :
                            <div>
                                <Container className="res-headers">
                                    <Row>
                                        <Col md="12" style={{textAlign:"center", marginTop:"3rem", marginBottom:"2rem"}}>
                                            <h1>Reservations</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3"></Col>
                                        <Col md="6" style={{textAlign:"center", marginBottom:"3rem"}}>
                                            {this.state.showNotLogged ? <h3>You need to Login to make a reservation</h3> : <h3>Welcome {this.state.resName}!</h3>}
                                        </Col>
                                        <Col md="3"></Col>
                                    </Row>
                                    <Row>
                                        <Col className="res-btn-contain">
                                            <Button className="splash-btn" onClick={this.showCreateModal}>Make Reservation</Button>
                                            <Button className="splash-btn" onClick={this.showResList}>View Your Reservations</Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row className="res-row">
                                        <Col sm="3" md="2"></Col>
                                        <Col xs="12" sm="6" md="8">
                                        <br/><br/>          
                                            <div>
                                                {this.state.showError11000 ? <h1>Please Enter a Different Name</h1> : null }
                                                <div className="splash-span">
                                                    {this.state.showResList ? <EditResContainer 
                                                                                    reses={this.state.reses} 
                                                                                    handleDeleteRes={this.handleDeleteRes} 
                                                                                    resName={this.state.resName} 
                                                                                /> : null}
                                                    {this.state.showCreateModal ? <CalendarCreate resName={this.state.resName} addRes={this.addRes} targetDate={this.props.targetDate} handleCancelModal={this.handleCancelModal} showCreateModal={this.showCreateModal} />
                                                                                
                                                                                : null }
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="3" md="2"></Col>
                                    </Row>
                                </Container>
                            </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default ReservationContainer;