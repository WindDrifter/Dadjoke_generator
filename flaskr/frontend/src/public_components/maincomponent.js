import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {joke_id: "", redirect: false, "url": ""};
    this.submitRequest = this.submitRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  submitRequest(event){
    event.preventDefault();
    this.state.redirect = true;
    this.state.url = `/getDadJoke/${this.state.joke_id}`;
    this.props.history.push(this.state.url);
    this.forceUpdate();
  }
  handleChange(event){
    event.preventDefault();
    this.setState({"joke_id": event.target.value});
  }
  render () {
    const redirect = this.state.redirect;
    if(redirect){
      return (<Redirect to={`${this.state.url}`} />);
    }
    else{

      return (
        <div>
          <h2>Welcome to dadjoke generator, Click get random joke to get started</h2>
            <Link to="/getDadJoke"> Get random joke </Link>
            <h3> OR </h3>
          <h2>If you know a joke id, please enter here</h2>
          <form className="userform">
            <label id="joke_id">
              <input type="text" key="joke_id" name="joke_id" onChange={this.handleChange} value={this.state.joke_id}/>
            </label>
            <input type="submit" onClick={this.submitRequest} value="Submit" />
          </form>
        </div>
      );
    }
  }
}

export default MainComponent
