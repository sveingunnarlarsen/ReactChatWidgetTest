import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import {getResponse} from "./chatbot";

getResponse("test");

class App extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = async (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API    
    addResponseMessage(await getResponse(newMessage));
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  } 
}

export default App;