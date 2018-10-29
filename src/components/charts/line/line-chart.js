import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ReferenceArea } from 'recharts';
import { connect } from 'react-redux'

import { setDateFilter } from '../../../actions'

import { getDatasets } from '../../../datasets'

import './line.css'

class MyLineChart extends Component {
  state = {
    refAreaLeft : '',
    refAreaRight : '',
    animation : true
  }
  
  zoomIn = () => {
  	let { refAreaLeft, refAreaRight } = this.state;
		if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
    	this.setState({
      	refAreaLeft : '',
        refAreaRight : ''
      });
    	return;
    }

	  if (refAreaLeft > refAreaRight) [ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ]
    this.props.onDateFilter(refAreaLeft, refAreaRight)

		this.setState({
      refAreaLeft : '',
      refAreaRight : '', 
    })  
  }

	getNormalizedData(datasets) {
    const { yearInit, yearEnd, shouldRenderMonths } = this.props.dates
    const data = []

    for (let year = yearInit; year <= yearEnd; year++) {
      if (shouldRenderMonths) {
        for (let month = 1; month <= 12; month++) {
          const dataEntry = { name: `${month}/${year}` }
          
          datasets.forEach(content => {
            dataEntry[content.id] = content.data[year].normalized.detailed[month-1]
          })
          
          data.push(dataEntry)
        }
      } else {
        const dataEntry = { name: year }
        
        datasets.forEach(content => {
          dataEntry[content.id] = content.data[year].normalized.total
        })
        
        data.push(dataEntry)
      }
    }
    return data
  }

  render() {
    const { shouldRenderMonths } = this.props.dates
    const datasets = getDatasets(this.props.datasets)
    const { refAreaLeft, refAreaRight } = this.state;
    const data = this.getNormalizedData(datasets)

    return (
      <div style={{ height:  '100%' }}>
        <LineChart
          width={800}
          height={500}
          data={data}
          onMouseDown = { (e) => e && this.setState({ refAreaLeft: e.activeLabel }) }
          onMouseMove = { (e) => e && this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel }) }
          onMouseUp = { () => !shouldRenderMonths && this.zoomIn() }>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" padding={{ left: 15, right: 15 }} />
          <Tooltip wrapperStyle={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }} />
          
          {datasets.map(dataset => (
            <Line
              type='natural'
              dataKey={dataset.id}
              key={dataset.id}
              name={dataset.label}
              stroke={dataset.color}
              animationDuration={300}
              unit={dataset.unit}
            />
          ))}

          {datasets.length > 0 && refAreaLeft && refAreaRight && (
            <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />  
          )}
        </LineChart> 
      </div>
    );
  }
}

const mapStateToProps = ({ datasets, dates }) => ({ datasets, dates })

const mapDispatchToProps = dispatch => ({
  onDateFilter: (init, end) => dispatch(setDateFilter(init, end))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLineChart)