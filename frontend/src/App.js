import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Polling from "./components/sports-polling";

class App extends Component {
  render() {
    return (
      <Router>

        <div className="container">      

          <Route exact path="/" component={Polling} />
          {/* <Route exact path="/edit/e:id" component={Polling} /> */}

        </div>

      </Router> 
    );
  }
}
export default App;
