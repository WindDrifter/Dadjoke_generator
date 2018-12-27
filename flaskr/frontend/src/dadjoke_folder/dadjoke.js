import React from "react"
import PropTypes from "prop-types"
class Dadjoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dadjoke: {}, liked: 0, hated: 0, meh: 0, clicked: false};
    this.submitRequest = this.submitRequest.bind(this);
    this.update_dadjoke = this.update_dadjoke.bind(this);
    this.getDadJoke = this.getDadJoke.bind(this);
    this.jokeLike = this.jokeLike.bind(this);
    this.jokeMeh = this.jokeMeh.bind(this);
    this.jokeHate = this.jokeHate.bind(this);
    this.update_stats = this.update_stats.bind(this);
    this.generatorNewJoke = this.generatorNewJoke.bind(this);
    this.params = props.match.params;
    this.joke_id = this.params.id;
  }
  componentDidMount(){
    this.getDadJoke();
  }
  jokeHate(event){
    event.preventDefault();
    this.submitRequest({joke_id: this.state.dadjoke.id, hate: 1});
  }
  jokeMeh(event){
    event.preventDefault();
    this.submitRequest({joke_id: this.state.dadjoke.id, meh: 1});
  }
  jokeLike(event){
    event.preventDefault();
    this.submitRequest({joke_id: this.state.dadjoke.id, like: 1});
  }
  generatorNewJoke(event){
    event.preventDefault();
    this.props.history.push("/getDadJoke");
    this.joke_id = "";
    this.getDadJoke();
  }
  getDadJoke(){
    let url = "https://icanhazdadjoke.com/";
    if(this.joke_id){
      url = `https://icanhazdadjoke.com/j/${this.joke_id}`
    }
    fetch(url, {
      method: "GET",
      headers:{
        Accept: 'application/json'
      }
    }).then(res => res.json()).then(response => this.update_dadjoke(response))
    .catch(error => console.error('Error:', error));
  }
  update_dadjoke(dadjoke){
    this.state.dadjoke = dadjoke;
    let joke_id = this.state.dadjoke.id;
    fetch(`/api/dadjoke/${joke_id}`, {
      method: "GET",
      headers:{
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(response => this.update_stats(response))
    .catch(error => console.error('Error:', error));


    this.forceUpdate();
  }
  update_stats(stats){
    this.state.meh = stats.meh;
    this.state.likes = stats.likes;
    this.state.hates = stats.hates;
    this.clicked = true;
    localStorage.setItem(stats.joke_id, this.clicked);
    this.forceUpdate();
  }
  submitRequest(request_data){
    let joke_id = this.state.dadjoke.id;
    let send_data = request_data;
    let url = `/api/dadjoke/${joke_id}`;
    fetch(url, {
    method: "POST",
    body: JSON.stringify(send_data),
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(response => this.update_stats(response))
  .catch(error => console.error('Error:', error));
  }
  render () {
    let joke_id = this.state.dadjoke.id;
    let clicked = localStorage.getItem(joke_id);
    return (
      <div>
        {this.state.dadjoke &&
        <div>
          <h2> {this.state.dadjoke.joke}</h2>
          <button onClick={this.jokeLike} disabled={clicked}>
            I like it {this.state.likes !== 0 && this.state.likes}
          </button>
          <button onClick={this.jokeMeh} disabled={clicked}>
            Don't care {this.state.meh !== 0 && this.state.meh}
          </button>
          <button onClick={this.jokeHate} disabled={clicked}>
            I hate it {this.state.hates !== 0 && this.state.hates}
          </button>
        </div>
        }
        {!this.state.dadjoke &&
          <div>
            <h2>Well, seems I forgot that dadjoke</h2>
            <h3>404, Joke not found</h3>
          </div>}
        <button onClick={this.generatorNewJoke}>Generate new joke</button>

      </div>
    );
  }
}

export default Dadjoke
