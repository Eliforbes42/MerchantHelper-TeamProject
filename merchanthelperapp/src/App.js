import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';

class App extends Component {
  render() {
    return (
      <div style={{'background-color':'#ffeaa7'}}>
          <Main/>
      </div>
    );
  }
}

export default App;
