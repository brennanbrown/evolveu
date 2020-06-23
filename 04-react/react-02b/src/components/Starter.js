import React from 'react';

import './Starter.css';
import logo from '../logo.svg';

function Starter(props) {

    console.log("Inside Starter Component");

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {props.sMessageArea}
                    </p>
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div>
        </div>
    );
}
    
export default Starter;