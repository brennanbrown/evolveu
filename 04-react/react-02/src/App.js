import React, { useState } from 'react';
import Account from './components/BankAccount/AccountReact';
import City from './components/Cities/CityReact'
import c140b from './components/c140b';
import Starter from './components/Starter';
import TictacGame from './components/Tictactoe';
import ToDo from './components/LinkedList/LinkedListReact';
// import ToDoApp from './components/ToDoList/index';
import two from './two.svg';
import three from './three.svg';
import four from './four.svg';
import one from './one.svg';
import five from './five.svg';
import six from './six.svg';
import brain from './seven.svg';
import './App.css';



function App() {
  
  const [messageArea, setMessage] = useState("Edit src/App.js and save to reload.");
  const [appToRun, setAppToRun] = useState("");
  const [count, setCount] = useState(10);
  
  function myOnClickCount(e) {
    
    let appName = "";
    const appKey = Number(e.target.getAttribute('ikey'));
    
    // alert(e.target.id)
    console.log(e.target.getAttribute('ikey'));
    
    // console.log('we just clicked count', count);
    setCount(count + 1);
    
    appName = c140b.appList.find(element => appKey === element.key).appName;
    
    setMessage(`Call Application #${appKey} Name is ${appName}`);
    setAppToRun(appName);
  }
  
  return (
    <div className="App">
    <header className="App-header">
    <div className="row clearfix">
    <div onClick={myOnClickCount} className="span_4 column"
    id="one" ikey="1" >
    <img src={one} className="App-logo-reverse" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="two" ikey="2">
    <img src={two} className="App-logo" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="three" ikey="3" >
    <img src={three} className="App-logo" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="Ball" ikey="4">
    <img src={four} className="App-logo" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="five" ikey="5">
    <img src={five} className="App-logo-reverse" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="Virus" ikey="6">
    <img src={six} className="App-logo" alt="logo" />
    </div>
    <div onClick={myOnClickCount} className="span_4 column"
    id="Brain" ikey="7">
    <img src={brain} className="App-logo" alt="logo" />
    </div>
    </div>
    </header>
    <div className="AppArea">
    {appToRun === "Starter" &&
    <div>
    <Starter sMessageArea={messageArea} />
    </div>
  }
  {appToRun === "Tictactoe" &&
  <div>
  <TictacGame sMessageArea={messageArea} />
  </div>
}
{appToRun === "Account" &&
<div>
<Account />
</div>
}
{appToRun === "Cities" &&
<div>
<City />
</div>
}
{appToRun === "ToDo" &&
<div>
<ToDo />
</div>
}
<div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</div>
</div> 

);
}

export default App;