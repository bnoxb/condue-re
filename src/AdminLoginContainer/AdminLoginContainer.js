import React, { Component } from 'react';
import AdminLogin from './AdminLogin/AdminLogin';
import NewAdmin from './NewAdmin/NewAdmin';

class AdminLoginContainer extends Component {
    constructor(){
        super();

        this.state = {
            showModalCreate: false,
            credentials: {
                username: '',
                password: '',
            },
            showError11000: false,
            showError401: false,
        }
    }

    showModalCreate = () => {
        console.log('showing create new user');
        this.setState({
            showModalCreate: true,
            showError11000: false,
            showError401: false,
        })
    }

    showModalLogin = () => {
        this.setState({
            showModalCreate: false,
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
        console.log('checking credentials...');
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
        console.log(parsedResponse);
        if(parsedResponse.status === 401){
            this.setState({
                showError401: true,
            })
        }
        if(parsedResponse.status === 200){
            this.setState({
                showError401: false,
            })
            this.props.logIn();
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
            console.log(parsedResponse);
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
        console.log("this is logged prop", this.props.logged);
        console.log(this.state);
        return(
            <div>
                <h1> Dis where you login</h1>
                <button onClick={this.showModalCreate}>Signup</button>
                <button onClick={this.showModalLogin}>Login</button>
                {this.state.showError11000 ? <h1>Username is taken</h1> : null }
                {this.state.showError401 ? <h1>Invalid Credentials</h1> : null }
                {this.state.showModalCreate ?   <NewAdmin 
                                                    handleInput={this.handleInput} 
                                                    newAdminSubmit={this.newAdminSubmit} 
                                                /> : 
                                                <AdminLogin 
                                                    handleInput={this.handleInput}
                                                    checkLogin={this.checkLogin}
                                                />}
            </div>
        )
    }
}

export default AdminLoginContainer;