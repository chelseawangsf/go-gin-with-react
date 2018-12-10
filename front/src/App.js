import './App.css';

import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    fetch('http://192.168.0.168:5901/ping')
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

  render() {
    return (
      <div className="App">
        <p>Upload an image to server and perform some operations, then show the result.</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
