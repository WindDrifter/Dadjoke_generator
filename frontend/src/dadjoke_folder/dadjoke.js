import React from "react"
import PropTypes from "prop-types"
class Dadjoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dadjoke: {}, liked: 0, hated: 0, meh: 0, clicked: false, previous_click: ""};
    this.submitRequest = this.submitRequest.bind(this);
    this.update_dadjoke = this.update_dadjoke.bind(this);
    this.getDadJoke = this.getDadJoke.bind(this);
    this.jokeReact = this.jokeReact.bind(this);
    this.update_stats = this.update_stats.bind(this);
    this.generatorNewJoke = this.generatorNewJoke.bind(this);
    this.params = props.match.params;
    this.joke_id = this.params.id;
  }
  componentDidMount(){
    this.getDadJoke();
  }
  jokeReact(event){
    // preparing submit data for the backend
    event.preventDefault();
    let name = event.target.name;
    let vote = 1;
    let userVote=localStorage.getItem(this.state.dadjoke.id);
    if(userVote===name){
      vote = -1;
    }
    this.submitRequest({joke_id: this.state.dadjoke.id, [name]: vote }, name, vote);
  }
  generatorNewJoke(event){
    // When generate new joke button is press, it will recall the dad joke api
    // and get a new joke
    event.preventDefault();
    this.props.history.push("/getDadJoke");
    this.joke_id = "";
    this.getDadJoke();
  }
  getDadJoke(){
    // if a joke id is provided such as "getDadJoke/jokeid"
    //  then the api will call the url that reside in the if statement
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
    // after getting dadjoke from the third party api
    // it will update the local state and getting the vote stats
    // It will refresh after stats are updated
    this.setState({"dadjoke": dadjoke});
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
  update_stats(stats, clicked_item="", vote=0){
    // Will get the data from the database and see how many
    // people like, hate, or don't care about the joke
    this.setState({"likes": stats.likes});
    this.setState({"hates": stats.hates});
    this.setState({"meh": stats.meh});
    if(clicked_item && vote===1){
      localStorage.setItem(stats.joke_id, clicked_item);
    }
    else{
      localStorage.setItem(stats.joke_id, "");
    }
    this.forceUpdate();
  }
  submitRequest(request_data, voted="", vote=0){
    let joke_id = this.state.dadjoke.id;
    let send_data = request_data;
    this.clicked = true;
    let url = `/api/dadjoke/${joke_id}`;
    fetch(url, {
    method: "POST",
    body: JSON.stringify(send_data),
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(response => this.update_stats(response, voted, vote))
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
          <button className="reactionButton"
            onClick={this.jokeReact} disabled={(clicked !=="like" && clicked)}
             name="like" value="like" id="reactionLike">
            I like it {this.state.likes !== 0 && this.state.likes}
          </button>
          <button className="reactionButton"
            onClick={this.jokeReact} disabled={(clicked !=="meh" && clicked)}
             name="meh" value="meh" id="reactionMeh">
            Don't care {this.state.meh !== 0 && this.state.meh}
          </button>
          <button className="reactionButton"
            onClick={this.jokeReact} disabled={(clicked !=="hate" && clicked)}
             name="hate" value="hate" id="reactionHate">
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
