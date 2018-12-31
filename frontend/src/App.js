import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MainComponent from "./public_components/maincomponent";
import Dadjoke from "./dadjoke_folder/dadjoke";
import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: ""};
  }
  changeURL(url){
    this.setState({url: url});
    this.forceUpdate();
  }

  render() {
    let _this = this;
      if(this.state.url){
        return (<Router><Redirect to={`${this.state.url}`} /></Router>);
      }
      else{
        return (
        <div>
          <Router>
            <div className="App">
              <header className="App-header">
                <Link className="headerlinks" to="/"> Home </Link>
                <Link className="headerlinks" to="/getDadJoke"> Get random joke </Link>
              </header>
              <div>
                <Switch>

                    <Route exact path="/" render={(props)=><MainComponent {...props} changeURL={_this.changeURL} />}/>
                    <Route exact path="/getDadJoke" component={Dadjoke} />
                    <Route exact path={`/getDadJoke/:id`} component={Dadjoke} />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      )
    }
  }
}

export default App;
