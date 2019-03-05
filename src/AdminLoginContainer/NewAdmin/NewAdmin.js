import React from 'react';

const NewAdmin = (props) => {
    return(
        <div>
            <form onSubmit={props.newAdminSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" onChange={props.handleInput} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={props.handleInput} />
                </label>
                <input type="Submit" />
            </form>
        </div>
    )
}

export default NewAdmin;