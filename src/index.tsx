import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const chatbotRoot = document.createElement('div');
chatbotRoot.id = "chatbot-root";
document.body.appendChild(chatbotRoot);
ReactDOM.render(<App />, chatbotRoot);
