import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {joke_id: "", "url": ""};
    this.submitRequest = this.submitRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    debugger;
    this.changeURL = this.props.changeURL;
    this.redirectToGenerator = this.redirectToGenerator.bind(this);
  }
  redirectToGenerator(event){
    event.preventDefault();
    this.props.history.push(`/getDadJoke`);
    this.changeURL(`/getDadJoke`);

    this.forceUpdate();
  }
  submitRequest(event){
    event.preventDefault();
    this.props.history.push(`/getDadJoke/${this.state.joke_id}`);
    this.changeURL(`/getDadJoke/${this.state.joke_id}`);
    this.forceUpdate();
  }
  handleChange(event){
    this.setState({"joke_id": event.target.value});
  }
  render () {


      return (
        <div id="mainpagediv">
          <h2 className="Title">Welcome to dadjoke generator, Click get random joke to get started</h2>
            <button id="maingen" onClick={this.redirectToGenerator}> Get random joke </button>
            <h3> OR </h3>
          <h2 className="Title">If you know a joke id, please enter here</h2>
          <form className="userform">
            <label id="joke_id">
              <input type="text" id="jokeIdText" key="joke_id" name="joke_id" onChange={this.handleChange} value={this.state.joke_id}/>
            </label>
            <input id="submitWJokeId" type="submit" onClick={this.submitRequest} value="Submit" />
          </form>
        </div>
      );

  }
}

export default MainComponent
