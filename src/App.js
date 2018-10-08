import React, { Component } from 'react';
import './App.css';
import Clock from './clock';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { deadline: '2019/12/30' };
  }
  ChangeDeadline(data) {
    this.setState({ deadline: data });
  }

  render() {
    return (
      <div className="App">
        <Clock deadline={this.state.deadline}
          ChangeDeadline={(data) => this.ChangeDeadline(data)}
        />
      </div>
    );
  }
}

export default App;
