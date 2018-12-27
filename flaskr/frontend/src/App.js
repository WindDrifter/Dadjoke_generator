import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import MainComponent from "./public_components/maincomponent";
import Dadjoke from "./dadjoke_folder/dadjoke";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>

      <div className="App">
        <header className="App-header">
          <Link to="/"> Home </Link>
          <Link to="/getDadJoke"> Get random joke </Link>
        </header>
        <div>
          <Switch>
            <Route exact path="/" component={MainComponent} />
            <Route exact path="/getDadJoke" component={Dadjoke} />
            <Route exact path={`/getDadJoke/:id`} component={Dadjoke} />
          </Switch>
        </div>

      </div>
      </Router>

    );
  }
}

export default App;