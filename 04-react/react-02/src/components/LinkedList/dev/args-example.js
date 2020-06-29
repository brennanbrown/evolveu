import React, { useState } from 'react';
import ReactDOM, { render } from "react-dom"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      topicBox: null,
      payloadBox: null
    };
    
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  publish() {
    console.log( this.state.topicBox, this.state.payloadBox );
  }
  
  render() {
    return <div>
      <input 
        type="text" 
        name="topicBox" 
        placeholder="Enter topic here..." 
        value={ this.state.topicBox }
        onChange={ this.handleChange } 
      />
      
      <input 
        type="text" 
        name="payloadBox" 
        placeholder="Enter payload here..."
        value={ this.state.payloadBox } 
        onChange={ this.handleChange } 
      />
      
      <button value="Send" onClick={ this.publish }>Publish</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('container'));