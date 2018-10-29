import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import { clearDateFilter, setBeginDateFilter, setEndDateFilter } from '../../actions'

const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
        
const MySelect = ({ value, onChange, id, name }) => (
  <FormControl variant="filled">
    <InputLabel htmlFor={id}>{name}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      {years.map(year => (
        <MenuItem key={year} value={year}>{year}</MenuItem>
      ))}
    </Select>
  </FormControl>
)

const Dates = ({ dates, onClearDateFilter, onSelectBeginDate, onSelectEndDate }) => (
  <Fragment>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
      <MySelect value={dates.yearInit} onChange={onSelectBeginDate} id='date-init' name='Início'/>
      <MySelect value={dates.yearEnd} onChange={onSelectEndDate} id='date-end' name='Fim'/>
    </div>
    {dates.filtering && (
      <FormControl component="fieldset" style={{ width: '100%' }}>
        <Button color="primary" onClick={onClearDateFilter}>
          Limpar Filtro de Datas
        </Button>
      </FormControl>
    )}
  </Fragment>
)

const mapStateToProps = ({ dates }) => ({ dates })

const mapDispatchToProps = dispatch => ({
  onClearDateFilter: () => dispatch(clearDateFilter()),
  onSelectBeginDate: (year) => dispatch(setBeginDateFilter(year)),
  onSelectEndDate: (year) => dispatch(setEndDateFilter(year))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dates)
