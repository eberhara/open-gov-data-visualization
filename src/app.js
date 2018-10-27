import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Line from './line'
import Spiralgraph from './spiralgraph'
import Streamgraph from './streamgraph'

import './app.css';
import '../node_modules/react-vis/dist/style.css';

const StreamgraphComponent = () => (
  <div className="app-chart">
    <Streamgraph />
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Open Government Data Visualization</h1>
        </header>
        <div className="app-body">
          <Router>
            <div>
              <Route exact path="/" component={StreamgraphComponent} />
              <Route path="/line" component={Line} />
              <Route path="/spiralgraph" component={Spiralgraph} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
