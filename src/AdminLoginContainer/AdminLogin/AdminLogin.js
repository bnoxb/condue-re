import React from 'react';
import { Form, Label, Input, Button } from 'reactstrap';

const AdminLogin = (props) => {
    return(
        <div>
            <Form onSubmit={props.checkLogin}>
                <Label>
                    Username:
                    <Input type="text" name="username" onChange={props.handleInput} />
                </Label>
                <Label>
                    Password:
                    <Input type="password" name="password" onChange={props.handleInput} />
                </Label>
                <Button type="Submit">Submit</Button>
            </Form>
        </div>
    )
}

export default AdminLogin;