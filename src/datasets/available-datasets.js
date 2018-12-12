import percentage from './example-percentage'
import homicidios from './homicidios'
import roubos from './roubos'
import posseEntorpecentes from './posse-entorpecentes'

const availableDatasets = [{
  id: 'homicides',
  label: 'Homicídio Doloso',
  color: '#2196f3',
  type: 'absolute',
  data: homicidios
}, {
  id: 'roubos',
  label: 'Roubos',
  color: '#3f51b5',
  type: 'absolute',
  data: roubos
}, {
  id: 'posse-entorpecentes',
  label: 'Posse de entorpecentes',
  color: '#e91e63',
  type: 'absolute',
  data: posseEntorpecentes
}, {
  id: 'exemplo',
  label: 'Exemplo percentage',
  color: '#9c27b0',
  type: 'percentage',
  unit: '%',
  data: percentage
}];

export default availableDatasets

