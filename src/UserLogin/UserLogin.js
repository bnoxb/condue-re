import React, { Component } from 'react';

class UserLogin extends Component {
    constructor(){
        super();
        this.state = {
            logged: false,

        }
    }

    login = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}auth/google`,{
                method: "GET",
                credentials: 'include',
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsedResponse = await response.json();
            console.log(parsedResponse);
        }catch(err){
            console.log('Oauth Error', err);
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.login}>login with google</button>
            </div>
        )
    }
}

export default UserLogin;