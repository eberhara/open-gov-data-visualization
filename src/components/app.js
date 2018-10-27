import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Line, Spiralgraph, Streamgraph } from './charts'
import Filters from './filters'

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Open Government Data Visualization</h1>
        </header>
        <div className="app-body">
          <div className="app-body__chart">
            <Router>
              <div>
                <Route exact path="/" component={Streamgraph} />
                <Route path="/line" component={Line} />
                <Route path="/spiralgraph" component={Spiralgraph} />
              </div>
            </Router>
          </div>
          <div className="app-body__filters">
            <Filters />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
