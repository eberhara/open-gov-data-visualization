import percentage from './example-percentage'
import homicides from './homicides'

const availableDatasets = [{
  id: 'homicides',
  label: 'Homicídios',
  color: '#2196f3',
  type: 'absolute',
  data: homicides
}, {
  id: 'exemplo',
  label: 'Exemplo percentage',
  color: '#8884d8',
  type: 'percentage',
  unit: '%',
  data: percentage
}, {
  id: 'crimes',
  label: 'Crimes',
  color: '#f50057',
  type: 'absolute',
  data: homicides
}];

export default availableDatasets