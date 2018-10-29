import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {stack as d3Stack, stackOffsetWiggle} from 'd3-shape'
import {range, transpose} from 'd3-array'

import {FlexibleWidthXYPlot, AreaSeries, Hint, XAxis, YAxis, Crosshair } from 'react-vis'

import { setDateFilter } from '../../../actions'
import { getDatasets } from '../../../datasets'

import 'react-vis/dist/style.css'
import './streamgraph.css'

class Streamgraph extends Component {
  state = {
    hoveredIndex: -1,
    hintIndex: -1,
    lastDrawLocation: null,
    refAreaLeft : '',
    refAreaRight : '',
  }
  
  getDateRange = () => {
    const { yearInit, yearEnd, shouldRenderMonths } = this.props.dates
    let dateRange = []

    for(let year = yearInit; year <= yearEnd; year++) {
      if (shouldRenderMonths) {
        for(let month = 1; month <= 12; month++) {
          dateRange = dateRange.concat({ year, month, label: `${month}/${year}` })
        }
      } else {
        dateRange = dateRange.concat({ year, label: year })
      }
    }
    return dateRange
  }

  getNormalizedData(datasets) {
    const { yearInit, yearEnd, shouldRenderMonths } = this.props.dates

    const data = datasets.map(dataset => {
      let datasetData = []
      for(let year = yearInit; year <= yearEnd; year++) {
        if (shouldRenderMonths) {
          datasetData = datasetData.concat(dataset.data[year].normalized.detailed)
        } else {
          datasetData = datasetData.concat(dataset.data[year].normalized.total)
        }
      }
      return datasetData
    })

    const stack = d3Stack().keys(range(data.length)).offset(stackOffsetWiggle)
    const transposed = transpose(data)
    return stack(transposed).map(series => series.map((row, x) => ({x, y0: row[0], y: row[1]})))
  }

  handleMouseLeave = () => this.setState({ hoveredIndex: -1, value: false })
  
  handleMouseOver = (index) => {
    if (this.state.hoveredIndex !== index) {
      this.setState({ hoveredIndex: index })
    }
  }
  
  handleOnNearestXY = (value, { index }) => {
    if (this.state.hintIndex !== index) {
      this.setState({ hintIndex: index, value })
    }
  }
  
  renderHint() {
    const { data, hoveredIndex, hintIndex, value } = this.state;
    if (hoveredIndex < 0 || hintIndex < 0) return null;
    const dateRange = this.getDateRange()
    if (!dateRange[hintIndex]) return null

    const { label, month, year } = dateRange[hintIndex]
    const datasets = getDatasets(this.props.datasets)

    return (
      <Crosshair values={[value]}>
        <div className='chart-hint'>
          <h3>{label}</h3>
          {datasets.map(dataset => (
            <p key={dataset.id}>{dataset.label}: {!!month ? dataset.data[year].detailed[month - 1] : dataset.data[year].total}{dataset.unit}</p>  
          ))}
        </div>
      </Crosshair>
    )
  }

  render() {
    const { shouldRenderMonths, yearInit, yearEnd } = this.props.dates
    const { hoveredIndex, lastDrawLocation } = this.state;
    const datasets = getDatasets(this.props.datasets)
    const data = this.getNormalizedData(datasets)
    const dateRange = this.getDateRange()
    
    return (
      <div className="streamgraph-example">
        <div className="streamgraph">
          <FlexibleWidthXYPlot
            animation
            onMouseLeave={this.handleMouseLeave}
            xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
            height={500}>
            <XAxis tickFormat={(tick) => dateRange[tick] && dateRange[tick].label }/>
            <YAxis tickFormat={() => ''}/>
            
            {this.renderHint()}
            
            {data.map((series, index) => (
              <AreaSeries
                key={index}
                curve="curveNatural"
                className={`${index === hoveredIndex ? 'highlighted-stream' : ''}`}
                onSeriesMouseOver={() => this.handleMouseOver(index)}
                onNearestX={this.handleOnNearestXY}
                data={series}
                color={datasets[index].color}
               />
            ))}

          </FlexibleWidthXYPlot>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ datasets, dates }) => ({ datasets, dates })

export default connect(
  mapStateToProps,
)(Streamgraph)