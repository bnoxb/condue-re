import React, { Component } from 'react';
import { Container, Row, Button, Label, FormGroup, Input, Form } from 'reactstrap';
import database from '../../firebase/firebase';
import '../style.css';
class ChatContainer extends Component {
    constructor(){
        super();
        this.state = {
            messages: [],
            message: {
                user: "",
                text: ""
            }
        }
    }
    componentDidMount(){
        database.ref('messages').on('value', (snapshot)=>{
            const updatedMessages = [];
            snapshot.forEach(childSnapshot=>{
                updatedMessages.push(
                  {
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                  }
                )
            });
            this.setState({
                messages: updatedMessages,
                message: {
                    ...this.state.message,
                    user: this.props.userName,
                }
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleInput = (e) => {
        this.setState({
            message: {
                ...this.state.message,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const newMsg = await database.ref('messages').push({
                "user" : this.state.message.user,
                "text" : this.state.message.text
            });
            console.log(newMsg.key + "sent message: " + newMsg.text);
        }catch(err){
            console.log('Firebase ERROR: ', err);
        };
        this.setState({
            message:{
                text: ""
            }
        });
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    render(){
        
        const messagesList = this.state.messages.map((message, i) => {
            return(
                <Row key={i}>
                    <p><span style={{color: 'red'}}>{message.user}</span>: {message.text}</p>
                </Row>
            )
        })
        return(
            <Container >
                <Container className="chat-msgbox">
                    <Container >
                        {messagesList}
                        {/* this is the div target to move the scrollbar to the bottom every time */}
                        <div style={{ float:"left", clear: "both" }}
                                ref={(e) => { this.messagesEnd = e; }}>
                        </div>
                    </Container>
                </Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="text" value={this.state.message.text} placeholder="Enter your message here" onChange={this.handleInput} />
                    </FormGroup>
                    <Button type="Submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default ChatContainer;