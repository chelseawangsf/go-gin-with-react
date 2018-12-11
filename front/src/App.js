import './App.css';

import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originUrl: window.location.href,
      message: '',
    };

    this.ping = this.ping.bind(this);
  }

  componentDidMount() {
    fetch(this.state.originUrl + 'ping')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            message: result.message,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            message: 'Something WRONG',
          });
        },
      );
  }

  ping(event) {
    console.log(event);
    console.log(this.state);
    fetch(this.state.originUrl + 'ping')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            message: this.state.message + ', ' + result.message,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            message: 'Something WRONG',
          });
        },
      );
  }

  render() {
    return (
      <div className="App">
        <p>Upload an image to server and perform some operations, then show the result.</p>
        <p>{this.state.originUrl}</p>
        <p>{this.state.message}</p>
        <button onClick={this.ping}>ping</button>
      </div>
    );
  }
}

export default App;
