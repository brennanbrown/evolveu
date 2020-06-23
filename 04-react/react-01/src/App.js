import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponent';
import EvenComponent from './components/EvenComponent';
import OddComponent from './components/OddComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 20,
      myState: "TBD"
    }

  };


  onPushMe = () => {
    console.log("You pushed me");

    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      myState: "now: " + this.state.counter
    });
    console.log(this.state.counter);
    
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>I am in control of this application and my 
            name is Andrew {this.state.myState}</h1>
          <button onClick={this.onPushMe}>
            Push Me
          </button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <MyComponent
            whatToSay=' What Ever'
            push={this.onPushMe}
          />
          <EvenComponent
            counter={this.state.counter}
          />
          <OddComponent
            counter={this.state.counter}
          />
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
    );
  }

}

export default App;
