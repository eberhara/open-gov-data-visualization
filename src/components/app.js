import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LineChart, SpiralGraph, StreamGraph } from './charts'
import { Datasets, Dates } from './filters'

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
              <Fragment>
                <Route exact path="/" component={StreamGraph} />
                <Route path="/line" component={LineChart} />
                <Route path="/spiralgraph" component={SpiralGraph} />
              </Fragment>
            </Router>
          </div>
          <div className="app-body__filters">
            <Datasets />
            <Dates />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
