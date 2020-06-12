//
// This is Competency 140B.
//
// Fun Improvements suggested by the React Competency listed in order of increasing difficulty:
// 
//  1. Display the location for each move in the format (col, row) in the move history list. Status: DONE!
//  2. Bold the currently selected item in the move list. Status: Do NOT see value. NOT Doing!
//  3. Rewrite Board to use two loops to make the squares instead of hardcoding them. Status: Do NOT see value. NOT Doing!
//  4. Add a toggle button that lets you sort the moves in either ascending or descending order. Status: Do NOT see value. NOT Doing!
//  5. When someone wins, highlight the three squares that caused the win. Status: DONE! Changed color to GREEN.
//  6. When no one wins, display a message about the result being a draw. Status: DONE!
//
//  Investigate error: logo.5d5d9eef.svg:1 GET http://localhost:3000/static/media/logo.5d5d9eef.svg net::ERR_CONNECTION_REFUSED

import React, { useState } from 'react';

import c140b from './containers/c140b';
import Starter from './components/Starter';
import TicTacToe from './components/Tictactoe';

import './App.css';

import shipST from './svg/star-trek-svgrepo-com.svg';
import insigniaST from './svg/section_31_geeksvgs.com.svg';
import insigniaKL1 from './svg/star_trek_klingon_insignia__geeksvgs.com.svg';
import insigniaKL2 from './svg/star_trek_33_geeksvgs.com.svg';
import kittyKL from './svg/klingon_kitty_geeksvgs.com.svg';
import spockHI from './svg/star_trek_27_geeksvgs.com.svg';

function App() {

  const [messageArea, setMessage] = useState("Edit src/App.js and save to reload.");
  const [appToRun, setAppToRun] = useState("Starter");

  const onPushMe = (e) => {

    let appName = "";
    const appKey = Number(e.target.getAttribute("ikey"));

    // **for** (let i = 0; i < c140b.appList.length; i++) {
    //     if (appKey === c140b.appList[i].key) {
    //         appName = c140b.appList[i].appName;
    //         break;
    //     }
    // }

    // c140b.appList.**forEach**( (element, idx, arr) => {
    //   if (appKey === arr[idx].key)
    //       appName = arr[idx].appName;
    // });

    // c140b.appList.**forEach**( (element) => {
    //   if (appKey === element.key)
    //       appName = element.appName;
    // });

    // const appNameDict = c140b.appList.**find** ( element => appKey === element.key );
    // appName = appNameDict.appName;
    
    appName = c140b.appList.find ( element => appKey === element.key ).appName;

    setMessage(`Call Application #${appKey} Name is ${appName}`);
    setAppToRun(appName);
    
  }
  // Enhancement: Add AppName below each svg.
  return (
    <div>
        <div className="App-svg-area">
            <div>
              <img src={shipST} className="App-svg1" alt="shipST" ikey="1" onClick={onPushMe} />
            </div>
            <div>
              <img src={insigniaST} className="App-svg2" alt="insigniaST" ikey="2" onClick={onPushMe} />
            </div>
            <div>
              <img src={insigniaKL1} className="App-svg3" alt="insigniaKL1" ikey="3" onClick={onPushMe} />
            </div>
            <div>
              <img src={insigniaKL2} className="App-svg4" alt="insigniaKL2" ikey="4" onClick={onPushMe} />
            </div>
            <div>
              <img src={kittyKL} className="App-svg5" alt="kittyKL" ikey="5" onClick={onPushMe} />
            </div>
            <div>
              <img src={spockHI} className="App-svg6" alt="spockHI" ikey="6" onClick={onPushMe} />
            </div>
        </div>
        <div className="AppArea">
            {appToRun !== "TicTacToe" &&
                <div>
                    <Starter sMessageArea={messageArea}/>
                </div>
            }
            {appToRun === "TicTacToe" &&
                <div>
                    <TicTacToe sMessageArea={messageArea}/>
                </div>
            }
        </div>
    </div>
  );
}

export default App;
