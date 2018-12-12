import percentage from './example-percentage'
import homicidios from './homicidios'

const availableDatasets = [{
  id: 'homicides',
  label: 'Homicídio Doloso',
  color: '#2196f3',
  type: 'absolute',
  data: homicidios
}, {
  id: 'exemplo',
  label: 'Exemplo percentage',
  color: '#8884d8',
  type: 'percentage',
  unit: '%',
  data: percentage
}];

export default availableDatasets