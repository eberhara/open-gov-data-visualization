import React from 'react';
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { clearDateFilter } from '../../actions'

const Dates = ({ dates, onClearDateFilter }) => (
  <FormControl component="fieldset" style={{ width: '100%' }}>
    {dates.filtering && (
      <Button color="primary" onClick={onClearDateFilter}>
        Limpar Filtro de Datas
      </Button>
    )}
  </FormControl>
)

const mapStateToProps = ({ dates }) => ({ dates })

const mapDispatchToProps = dispatch => ({
  onClearDateFilter: () => dispatch(clearDateFilter())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dates)