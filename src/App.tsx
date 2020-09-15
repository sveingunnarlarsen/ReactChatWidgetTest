import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import {getChatbotReply} from "./chatbot";
import Button from "./chatbot/Button";

class App extends Component {
  componentDidMount() {
    console.log("Testing");
  }

  handleNewUserMessage = async (newMessage) => {
    try {
      const result = await getChatbotReply(newMessage);            
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        addResponseMessage(result[i].text);
      } 
      
    } catch (e) {
      addResponseMessage(e.message);
    }  
  }

  render() {

    console.log(window.ChatbotData);

    return (
      <div className="App">
        <Widget
          title={window.ChatbotData.title}
          subtitle={window.ChatbotData.subTitle}
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  } 
}

export default App;