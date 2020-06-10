import React, { Component, useState } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./home";
import Stuff from "./stuff";
import Contact from "./contact";
import logo from './logo.svg';
import earth from './earth.svg';
import smile from './smile.svg';
import sport from './sport.svg';
import science from './science.svg';
import dna from './dna.svg';
import microbe from './microbe.svg';
import brain from './brain-and-head.svg';
import './App.css';
import AppOriginal from './components/app.original';


class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <div className="span_4 column" id="Science">
                        <img src={science} className="App-logo-reverse" alt="logo" />
                    </div>
                    <div className="span_4 column"
                            id="Earth">
                            <img src={earth} className="App-logo" alt="logo" />
                            <NavLink to="/stuff"></NavLink>
                        </div>
                        <div className="span_4 column"
                            id="Ball">
                            <img src={sport} className="App-logo" alt="logo" />
                        </div>
                        <div className="span_4 column"
                            id="DNA">
                            <img src={dna} className="App-logo-reverse" alt="logo" />
                        </div>
                        <div className="span_4 column"
                            id="Virus">
                            <img src={microbe} className="App-logo" alt="logo" />
                        </div>
                        <div className="span_4 column"
                            id="Brain">
                            <img src={brain} className="App-logo" alt="logo" />
                        </div>

                    <ul className="header">
                        <li><NavLink exact to="/home">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/home" component={Home} />
                        <Route path="/stuff" component={Stuff} />
                        <Route path="/contact" component={Contact} />
                    </div>
                    
                </div>
            </HashRouter>

        );
    }
}

export default Main;