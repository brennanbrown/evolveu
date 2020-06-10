import React, { useState } from 'react';
import logo from './logo.svg';
import earth from './earth.svg';
import smile from './smile.svg';
import sport from './sport.svg';
import science from './science.svg';
import dna from './dna.svg';
import microbe from './microbe.svg';
import brain from './brain-and-head.svg';
import './app.css';
import AppOriginal from './components/app.original';

function App() {

  const [count, setCount] = useState(10);

  function myOnClickCount(e) {

    alert(e.target.id)
    console.log(e.target.id);

    console.log('we just clicked count', count);
    setCount(count + 1);

  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="row clearfix">
          <div onClick={myOnClickCount} className="span_4 column"
            id="Science"> 
            <img src={science} className="App-logo-reverse" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Earth">
            <img src={earth} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Smile">
            <img src={smile} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Ball">
            <img src={sport} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="DNA">
            <img src={dna} className="App-logo-reverse" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Virus">
            <img src={microbe} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Brain">
            <img src={brain} className="App-logo" alt="logo" />
          </div>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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


  );
}

export default App;