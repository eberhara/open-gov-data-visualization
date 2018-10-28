import React from 'react';
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { addDataset, removeDataset } from '../../actions'
import availableDatasets from '../../datasets'

const Datasets = ({ datasets = [], onSelectDataset, onRemoveDataset }) => (
  <FormControl component="fieldset" style={{ width: '100%' }}>
    <FormLabel component="legend">Datasets</FormLabel>
    <FormGroup>
      {availableDatasets.map(({ id, label, color }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={datasets.includes(id)}
              onChange={() => datasets.includes(id) ? onRemoveDataset(id) : onSelectDataset(id)}
              value={id}
              color="primary"
              style={{ color }}
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
  onSelectDataset: id => dispatch(addDataset(id)),
  onRemoveDataset: id => dispatch(removeDataset(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Datasets)