import React from 'react';
import ChatContainer from './ChatContainer/ChatContainer';

const About = (props) => {
    return(
        <div>
            <h1>About Condue</h1>
            <h2>Where we get our ingredients?</h2>
            <p>King Soopers</p><br/>
            <h1>Nutrition Facts:</h1>
            <ChatContainer />
        </div>
    )
}

export default About;