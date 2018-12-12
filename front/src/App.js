import './App.css';

import axios from 'axios';
import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originUrl: window.location.href,
      message: '',
      selectedFile: null,
      loaded: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount = () => {
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
  };

  handleClick = event => {
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
  };

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);

    axios
      .post(this.state.originUrl + 'upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then(res => {
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <div className="App">
        <div>
          <p>Upload an image to server and perform some operations, then show the result.</p>
          <p>{this.state.originUrl}</p>
          <p>{this.state.message}</p>
          <button onClick={this.handleClick}>ping</button>
        </div>
        <div>
          <input type="file" name="" id="" onChange={this.handleSelectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
        </div>
      </div>
    );
  }
}

export default App;
