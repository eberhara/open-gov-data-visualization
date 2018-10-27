import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { addDataset } from '../../actions'
import availableDatasets from '../../datasets'

const Datasets = ({ datasets = [], onSelectDataset }) => (
  <FormControl component="fieldset" style={{ width: '100%' }}>
    <FormLabel component="legend">Datasets</FormLabel>
    <FormGroup>
      {availableDatasets.map(({ id, label }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={datasets.includes(id)}
              onChange={() => onSelectDataset(id)}
              value={id}
              color="primary"
            />
          }
          label={label}
          key={id}
        />
      ))}      
    </FormGroup>
  </FormControl>
)

const mapStateToProps = ({ datasets }) => ({ datasets })

const mapDispatchToProps = dispatch => ({
  onSelectDataset: id => dispatch(addDataset(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Datasets)