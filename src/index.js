// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebaseConfig from './firebase'; // Import firebaseConfig

// Firebase initialization
import { initializeApp } from 'firebase/app';
initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
