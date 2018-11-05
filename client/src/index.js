import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter} from 'react-router-dom';
import promise from "redux-promise";
import App from "./components/App";
import reducers from './reducers/index'
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const socket = io.connect(process.env.SOCKET_URL)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
    <BrowserRouter>
      <div className="app-bg">
      <App />
      </div>
      </BrowserRouter>
    </SocketProvider>
    </Provider>,
    document.getElementById('root')
);





// {
//   "id": 12,
//   "prompt": "Mongo is a noSQL database",
//   "choices": [
//     "True",
//     "False"
//   ],
//   "answer": "True",
//   "links": [
//     {
//       "href": "www.google.com",
//       "text": "LMGTFY"
//     }
//   ]
// },

// {
//   "id": 14,
//   "prompt": "SQL databases work better for relational data",
//   "choices": [
//     "TRUE",
//     "FALSE"
//   ],
//   "answer": "TRUE",
//   "links": [
//     {
//       "href": "www.google.com",
//       "text": "LMGTFY"
//     }
//   ]
// },