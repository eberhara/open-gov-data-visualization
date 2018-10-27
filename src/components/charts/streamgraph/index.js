import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {stack as d3Stack, stackOffsetWiggle} from 'd3-shape';
import {range, transpose} from 'd3-array';

import {DiscreteColorLegend, FlexibleWidthXYPlot, AreaSeries, Hint, LineMarkSeries, Crosshair, XAxis, YAxis} from 'react-vis';
import Highlight from './highlight';

import './streamgraph.css';

const DATA = {
  dates: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
  series: [{
    label: 'Outra coisa',
    type: 'percentage',
    data: [13.9, 4, 15.8, 74.2, 63.6, 13.0, 92.4, 11.7, 31.0 , 30.1 , 10.3 , 8.9]
  }, {
    label: 'Posse de entorpecentes',
    type: 'absolute',
    data: [6881, 6716, 6705, 5907, 6339, 6446, 7097, 8231, 10031, 11077, 13196, 15284]
  }, {
    label: 'Aprovação ensino médio',
    type: 'percentage',
    data: [70.0, 69.8, 65.9, 65.9, 67.0, 68.0, 68.0, 68.3, 69.1, 69.2, 72.9, 75.7]
  }, {
    label: 'Reprovação ensino médio',
    type: 'percentage',
    data: [13.9, 13.4, 15.8, 14.2, 13.6, 13.0, 12.4, 11.7, 11.0 , 10.1 , 10.3 , 8.9]
  }, {
    label: 'Outra coisa',
    type: 'percentage',
    data: [13.0, 92.4, 11.7, 31.0 , 30.1 , 60.3 , 80.9, 13.9, 4, 15.8, 74.2, 63.6]
  }]
}

const normalizeData = (series) => (
  series.map((serie) => {
    const newSerie = {
      ...serie
    }

    if (serie.type === 'absolute') {
      const max = _.max(serie.data);
      newSerie.data = serie.data.map((value) => value * 100 / max);  
    }
    return newSerie;
  })
)

const getData = () => normalizeData(DATA.series).map(({ data }) => data)

const generateData = () => {
  const data = normalizeData(DATA.series).map(({ data }) => data)

  const stack = d3Stack().keys(range(data.length)).offset(stackOffsetWiggle);
  const transposed = transpose(data);
  return stack(transposed).map(series => series.map((row, x) => ({x, y0: row[0], y: row[1]})));
}

class StreamgraphExample extends Component {
  state = {
    data: generateData(),
    hoveredIndex: -1,
    hintIndex: -1,
    lastDrawLocation: null
  }

  handleMouseLeave = () => this.setState({ hoveredIndex: -1 })
  
  handleMouseOver = (index) => {
    if (this.state.hoveredIndex !== index) {
      this.setState({ hoveredIndex: index })
    }
  }
  
  handleOnNearestXY = (value, { index }) => {
    if (this.state.hintIndex !== index) {
      this.setState({ hintIndex: index })
    }
  }
  
  renderHint() {
    const { data, hoveredIndex, hintIndex } = this.state;
    if (hoveredIndex < 0|| hintIndex < 0) return null;
  
    return (
      <Hint value={data[hoveredIndex][hintIndex]}>
        <div className='chart-hint'>
          <h3>{DATA.dates[hintIndex]}</h3>
          {DATA.series.reverse().map((serie, index) => (
            <p key={index}>{serie.label}: {serie.data[hintIndex]}{serie.type === 'percentage'? '%': ''}</p>  
          ))}
        </div>
      </Hint>
    )
  }
  render() {
    const { data, hintIndex, hoveredIndex, lastDrawLocation } = this.state;
  
    return (
      <div className="streamgraph-example">
        <div className="streamgraph">
          <FlexibleWidthXYPlot
            animation
            onMouseLeave={this.handleMouseLeave}
            xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
            height={500}>
            <YAxis tickFormat={() => ''}/>
            <XAxis tickFormat={(tick) => DATA.dates[tick]}/>

            {this.renderHint()}
            {data.map((series, index) => (
              <AreaSeries
                key={index}
                curve="curveNatural"
                className={`${index === hoveredIndex ? 'highlighted-stream' : ''}`}
                onSeriesMouseOver={() => this.handleMouseOver(index)}
                onNearestX={this.handleOnNearestXY}
                data={series} />
            ))}
            
            <Highlight onBrushEnd={(area) => {
              this.setState({
                lastDrawLocation: area
              });
            }} />
          </FlexibleWidthXYPlot>
        </div>
        <DiscreteColorLegend
          orientation="horizontal"
          items={DATA.series.reverse().map(({ label }) => label)}
        />
      </div>
    );
  }
}

export default StreamgraphExample;