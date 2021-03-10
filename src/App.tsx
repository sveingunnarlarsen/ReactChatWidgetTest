import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent, toggleWidget, dropMessages } from 'react-chat-widget';
import './App.css';

import { getChatbotReply } from "./chatbot";
import Button from "./chatbot/Button";

class App extends Component<{}, { id: string; title: string; subTitle: string }> {
    constructor(props) {
        super(props);
        this.state = {
            id: window.Planet9Chatbot.id,
            title: window.Planet9Chatbot.title,
            subTitle: window.Planet9Chatbot.subTitle,
        }
    }

    updateChatbotData() {
        dropMessages();
        this.setState({
            id: window.Planet9Chatbot.id,
            title: window.Planet9Chatbot.title,
            subTitle: window.Planet9Chatbot.subTitle,
        });
    }

    componentDidMount() {

    }

    handleNewUserMessage = async (newMessage) => {
        try {
            const result = await getChatbotReply(newMessage);
            for (let i = 0; i < result.length; i++) {
                if (result[i].text) {
                    addResponseMessage(result[i].text);
                } else {
                    console.log("not text: ", result);
                }
                if (result[i].delay) {
                    await new Promise(resolve => setTimeout(resolve, result[i].delay * 1000));
                }
            }
        } catch (e) {
            addResponseMessage(e.message);
        }
    }

    render() {
        return (
            <div className="chatbot-widget">
                <Widget
                    title={this.state.title}
                    subtitle={this.state.subTitle}
                    handleNewUserMessage={this.handleNewUserMessage}
                />
            </div>
        );
    }
}

export default App;