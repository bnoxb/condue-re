import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import database from '../../firebase/firebase';
import './style.css';
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
        //this.scrollToBottom(); Don't Think I need this >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
        }
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
                    <Container className="chat-msgs">
                        {messagesList}
                        {/* this is the div target to move the scrollbar to the bottom every time */}
                        <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </Container>
                </Container>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="user" value={this.state.message.user} placeholder="Enter your usename here" onChange={this.handleInput} />
                    <input type="text" name="text" value={this.state.message.text} placeholder="Enter your message here" onChange={this.handleInput} />
                    <button type="Submit">Submit</button>
                </form>
            </Container>
        )
    }
}

export default ChatContainer;