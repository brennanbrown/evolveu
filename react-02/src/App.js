import React, { useState } from 'react';

import c140b from './components/c140b';
import Starter from './components/Starter';
import TictacGame from './components/Tictactoe';
import earth from './earth.svg';
import smile from './smile.svg';
import sport from './sport.svg';
import science from './science.svg';
import dna from './dna.svg';
import microbe from './microbe.svg';
import brain from './brain-and-head.svg';
import './App.css';



function App() {

  const [messageArea, setMessage] = useState("Edit src/App.js and save to reload.");
  const [appToRun, setAppToRun] = useState("Starter");
  const [count, setCount] = useState(10);

  function myOnClickCount(e) {

    let appName = "";
    const appKey = Number(e.target.getAttribute('ikey'));

    // alert(e.target.id)
    console.log(e.target.getAttribute('ikey'));

    // console.log('we just clicked count', count);
    setCount(count + 1);

    appName = c140b.appList.find ( element => appKey === element.key ).appName;
    
    setMessage(`Call Application #${appKey} Name is ${appName}`);
    setAppToRun(appName);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="row clearfix">
          <div onClick={myOnClickCount} className="span_4 column"
            id="Science" ikey="1" > 
            <img src={science} className="App-logo-reverse" alt="logo"/>
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Earth" ikey="2">
            <img src={earth} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Smile" ikey="3" >
            <img src={smile} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Ball" ikey="4">
            <img src={sport} className="App-logo" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="DNA" ikey="5">
            <img src={dna} className="App-logo-reverse" alt="logo" />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Virus" ikey="6">
            <img src={microbe} className="App-logo" alt="logo"  />
          </div>
          <div onClick={myOnClickCount} className="span_4 column"
            id="Brain" ikey="7">
            <img src={brain} className="App-logo" alt="logo" />
          </div>
        </div>
      </header>
      <div className="AppArea">
            {appToRun !== "Tictactoe" &&
                <div>
                    <Starter sMessageArea={messageArea}/>
                </div>
            }
            {appToRun === "Tictactoe" &&
                <div>
                    <TictacGame sMessageArea={messageArea}/>
                </div>
            }
        </div>
    </div>

  );
}

export default App;
