import React from 'react';

const AdminLogin = (props) => {
    return(
        <div>
            <form onSubmit={props.checkLogin}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={props.handleInput} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={props.handleInput} />
                </label>
                <input type="Submit"/>
            </form>
        </div>
    )
}

export default AdminLogin;