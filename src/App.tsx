import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import 'react-chat-elements/dist/main.css';

import {getChatbotReply} from "./chatbot";
import Button from "./chatbot/Button";
import { ChatItem, MessageBox } from 'react-chat-elements'

class App extends Component {
  componentDidMount() {
    
  }

  handleNewUserMessage = async (newMessage) => {
    try {
      const result = await getChatbotReply(newMessage);            
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        addResponseMessage(result[i].text);
      } 

      /*
      if (result.answer) {      
        addResponseMessage(result.answer);
      } else {
        
      }
      */
    } catch (e) {
      addResponseMessage(e.message);
    }  
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