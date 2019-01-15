//import percentage from './example-percentage'
import furtos from './furtos'
import furtosVeiculos from './furtos-veiculos'
import homicidios from './homicidios'
import roubos from './roubos'
import roubosVeiculos from './roubos-veiculos'
import posseEntorpecentes from './posse-entorpecentes'

const availableDatasets = [{
  id: 'homicides',
  label: 'Homicídio Doloso',
  color: '#673ab7',
  type: 'absolute',
  data: homicidios
}, {
  id: 'roubo',
  label: 'Roubo',
  color: '#a31545',
  type: 'absolute',
  data: roubos
}, {
  id: 'roubo-veiculo',
  label: 'Roubo de Veículo',
  color: '#e91e63',
  type: 'absolute',
  data: roubosVeiculos
}, {
  id: 'furto',
  label: 'Furto',
  color: '#1769aa',
  type: 'absolute',
  data: furtos
}, {
  id: 'furto-veiculo',
  label: 'Furto de Veículo',
  color: '#2196f3',
  type: 'absolute',
  data: furtosVeiculos
}, {
  id: 'posse-entorpecentes',
  label: 'Posse de entorpecentes',
  color: '#357a38',
  type: 'absolute',
  data: posseEntorpecentes
}/*, {
  id: 'exemplo',
  label: 'Exemplo percentage',
  color: '#9c27b0',
  type: 'percentage',
  unit: '%',
  data: percentage
}*/];

export default availableDatasets

