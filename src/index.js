// Import necessary libraries
import React from 'react';
import ReactDOM from 'react-dom'; // For React 17, use 'react-dom'
import App from './App'; // Import the main App component
import './index.css'; // Import global styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Render the App component into the root element
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // Ensure there is a div with id 'root' in your index.html
);
