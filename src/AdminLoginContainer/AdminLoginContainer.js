import React, { Component } from 'react';
import AdminLogin from './AdminLogin/AdminLogin';
import NewAdmin from './NewAdmin/NewAdmin';
import { Container, Col, Row, Form, Input, FormGroup, Button } from 'reactstrap';
import "./style.css";

class AdminLoginContainer extends Component {
    constructor(){
        super();

        this.state = {
            showModalCreate: false,
            showModalLogin: false,
            credentials: {
                username: '',
                password: '',
            },
            showError11000: false,
            showError401: false,
        }
    }

    showModalCreate = () => {
        this.setState({
            showModalCreate: true,
            showError11000: false,
            showError401: false,
        })
    }

    showModalLogin = () => {
        this.setState({
            showModalCreate: false,
            showModalLogin: true,
            showError11000: false,
            showError401: false,
        })
    }

    handleInput = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value,
            }
        })
    }

    checkLogin = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch(process.env.REACT_APP_BACKEND + `auth/login`, {
            method: "POST",
            body: JSON.stringify(this.state.credentials),
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText);
        }
        const parsedResponse = await loginResponse.json();
        if(parsedResponse.status === 401){
            this.setState({
                showError401: true,
            })
        }
        if(parsedResponse.status === 200){
            await this.setState({
                showError401: false,
            })
            await this.props.logIn();
            this.props.history.push('/');
        }
    }

    newAdminSubmit = async (e) => {
        e.preventDefault();
        try{
            const newAdminResponse = await fetch(process.env.REACT_APP_BACKEND + 'auth/register', {
                method: "POST",
                body: JSON.stringify(this.state.credentials),
                headers: {
                    "Content-Type" : "application/json",
                },
                credentials: "include",
            });

            if(!newAdminResponse.ok){
                throw Error(newAdminResponse.statusText);
            }

            const parsedResponse = await newAdminResponse.json();
            if(parsedResponse.status === 11000){
                this.setState({
                    showError11000: true,
                })
            } else if (parsedResponse.status === 200) {
                this.setState({
                    showError11000: false,
                })
                this.props.logIn();
                this.props.history.push('/');
            }
        }catch(err){
            console.log(err);
        }
    }

    render() {
        return(
            <div className="admin">
                <Container >
                    <Row>
                        <Col md="12" style={{textAlign:"center"}}>
                            <h1>Admin Login</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4"></Col>
                        <Col md="4" style={{textAlign:"center"}}>
                            <Button className="admin-btn" onClick={this.showModalCreate}>Signup</Button>
                            <Button className="admin-btn" onClick={this.showModalLogin}>Login</Button>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                    <Row>
                        <Col md="3"></Col>
                        <Col md="6">
                            {this.state.showError11000 ? <h1>Username is taken</h1> : null }
                            {this.state.showError401 ? <h1>Invalid Credentials</h1> : null }
                            {this.state.showModalCreate ?   <NewAdmin 
                                                                handleInput={this.handleInput} 
                                                                newAdminSubmit={this.newAdminSubmit} 
                                                            /> : this.state.showModalLogin ?
                                                                <AdminLogin 
                                                                    handleInput={this.handleInput}
                                                                    checkLogin={this.checkLogin}
                                                                />
                                                                : null }
                        </Col>
                        <Col md="3"></Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

export default AdminLoginContainer;