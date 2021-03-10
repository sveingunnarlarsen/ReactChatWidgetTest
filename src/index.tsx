import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Only for testing
window.Planet9Chatbot = window.Planet9Chatbot ? window.Planet9Chatbot : {
    id: "795B6EA9-06EE-EA11-9452-7085C23EF572",
    title: "This is the title",
    subTitle: "Sub Title",
    component: null,
    changeChatbot: null,
    open: null,
    close: null,
};

const chatbotRoot = document.createElement('div');
chatbotRoot.id = "chatbot-root";
document.body.appendChild(chatbotRoot);
ReactDOM.render(<App ref={component => { window.Planet9Chatbot.component = component }} />, chatbotRoot);
