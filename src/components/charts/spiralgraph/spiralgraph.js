import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getDatasets } from '../../../datasets'

import './spiralgraph.css'

class Spiralgraph extends Component {
  getDateRange = () => {
    const { yearInit, yearEnd } = this.props.dates
    let dateRange = []

    for(let year = yearInit; year <= yearEnd; year++) {
      for(let month = 1; month <= 12; month++) {
        dateRange = dateRange.concat({ year, month, label: `${month}/${year}` })
      }
    }
    return dateRange
  }

  getNormalizedData(datasets) {
    const { yearInit, yearEnd } = this.props.dates

    return datasets.map(dataset => {
      let datasetData = []
      for(let year = yearInit; year <= yearEnd; year++) {
        datasetData = datasetData.concat(dataset.data[year].normalized.detailed)
      }
      return datasetData
    })
  }

  generateChart() {
    const datasets = getDatasets(this.props.datasets)
    const data = this.getNormalizedData(datasets)
    const dateRange = this.getDateRange()
    const { yearInit, yearEnd } = this.props.dates
    
    const width = 600, height = 600, start = 0, end = 2.25, numSpirals = yearEnd - yearInit, margin = {top:0,bottom:0,left:0,right:0};
    const d3 = window.d3
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const r = d3.min([width, height]) / 2;

    const radius = d3.scaleLinear().domain([start, end]).range([40, r]);
    
    document.getElementById('spiral-chart').innerHTML = ''
    const svg = d3.select("#spiral-chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const points = d3.range(start, end + 0.001, (end - start) / 1000);
    const spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle((r) => numSpirals * Math.PI * r)
      .radius(radius);

    const path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "steelblue");

    const spiralLength = path.node().getTotalLength()
    const someData = [];
    /*for (var i = 0; i < 365; i++) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      someData.push({
        date: currentDate,
        value: Math.random(),
        group: currentDate.getMonth()
      });
    }*/

    const newSomeData = []
    data.forEach((ds, index) => {
      ds.forEach((value, secondIndex) => {
        const month = dateRange[secondIndex].month - 1
        const year = dateRange[secondIndex].year
        newSomeData.push({
          label: datasets[index].label,
          color: datasets[index].color,
          date: new Date(year, month - 1, (index + 1) * 5),
          dateLabel: dateRange[secondIndex].label,
          value,
          group: datasets[index].id,
          realValue: datasets[index].data[year].detailed[month],
          spiralValue: year - yearInit + 1
        })
      })
    })
  
    newSomeData.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
    
    const barWidth = 9
    //var powerScale = d3.scalePow().exponent(Math.PI).domain([0, 100]).range([0, spiralLength])  

    //310
    //700
    //1080
    //1740
    const timeScale1 = d3.scaleTime().domain([new Date('2002-1-1'), (new Date('2002-12-31'))]).range([30, 325])  
    const timeScale2 = d3.scaleTime().domain([new Date('2003-1-1'), (new Date('2003-12-31'))]).range([335, 720])  
    const timeScale3 = d3.scaleTime().domain([new Date('2004-1-1'), (new Date('2004-12-31'))]).range([730, 1205])  
    const timeScale4 = d3.scaleTime().domain([new Date('2005-1-1'), (new Date('2005-12-31'))]).range([1215, 1783])  
    const timeScale5 = d3.scaleTime().domain([new Date('2006-1-1'), (new Date('2006-12-31'))]).range([1793, 2450])
    const timeScale6 = d3.scaleTime().domain([new Date('2007-1-1'), (new Date('2007-12-31'))]).range([2460, 3210])
    const timeScale7 = d3.scaleTime().domain([new Date('2008-1-1'), (new Date('2008-12-31'))]).range([3218, 4060])
    const timeScale = d3.scaleTime().domain(d3.extent(newSomeData, (d) => d.date)).range([0, spiralLength])  
    const yScale = d3.scaleLinear().domain([0, d3.max(newSomeData, (d) => d.value)]).range([0, (r / numSpirals) - 10])

    svg.selectAll("rect").data(newSomeData).enter().append("rect")
      .attr("x", function(d,i){
        var linePer = timeScale(d.date)
        if (d.spiralValue == 1) {
          linePer = timeScale1(d.date)
        }
        if (d.spiralValue == 2) {
          linePer = timeScale2(d.date)
        }
        if (d.spiralValue == 3) {
          linePer = timeScale3(d.date)
        }
        if (d.spiralValue == 4) {
          linePer = timeScale4(d.date)
        }
        if (d.spiralValue == 5) {
          linePer = timeScale5(d.date)
        }
        if (d.spiralValue == 6) {
          linePer = timeScale6(d.date)
        }
        if (d.spiralValue == 7) {
          linePer = timeScale7(d.date)
        }
        var posOnLine = path.node().getPointAtLength(linePer),
            angleOnLine = path.node().getPointAtLength(linePer - barWidth);

        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral
        
        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", (d) => {
        return barWidth
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      .style("fill", function(d){return d.color})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });
    
    var tF = d3.timeFormat("%b %Y"),
        firstInMonth = {};

    svg.selectAll("text")
      .data(newSomeData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


    const tooltip = d3.select("#spiral-chart").append('div').attr('class', 'tooltip')
    tooltip.append('div').attr('class', 'title')
    tooltip.append('div').attr('class', 'date')
    tooltip.append('div').attr('class', 'value')

    svg.selectAll("rect")
    .on('mouseover', function(d) {
        tooltip.select('.title').html("<b>" + d.label + "</b>");
        tooltip.select('.date').html("Data: <b>" + d.dateLabel + "</b>");
        tooltip.select('.value').html("Valor: <b>" + d.realValue + "<b>");

        d3.select(this)
        .style("fill","#FFFFFF")
        .style("stroke","#000000")
        .style("stroke-width","2px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    .on('mousemove', (d) => {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', (d) => {
        d3.selectAll("rect")
        .style("fill", function(d){return d.color;})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    })
  }

  componentDidMount() {
    this.generateChart()
  }
  
  componentDidUpdate() {
    this.generateChart()
  }

  render() {
    return <div id="spiral-chart"></div>
  }
}

const mapStateToProps = ({ datasets, dates }) => ({ datasets, dates })

export default connect(
  mapStateToProps,
)(Spiralgraph)