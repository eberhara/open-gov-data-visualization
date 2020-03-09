//import percentage from './example-percentage'
import furtos from './furtos'
import furtosVeiculos from './furtos-veiculos'
import homicidios from './homicidios'
import roubos from './roubos'
import roubosVeiculos from './roubos-veiculos'
import posseEntorpecentes from './posse-entorpecentes'
import obitosInternacoes from './obitos'
import internacoes from './internacoes'
import leitos from './leitos'

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
}, {
  id: 'internacoes-hospitais',
  label: 'Internações hospitalares',
  color: '#FF8F00',
  type: 'absolute',
  data: internacoes
}, {
  id: 'obitos-hospitais',
  label: 'Óbito pós internação',
  color: '#6D4C41',
  type: 'absolute',
  data: obitosInternacoes
}, {
  id: 'leitos',
  label: 'Leitos hospitalares',
  color: '#607D8B',
  type: 'absolute',
  data: leitos
}/*, {
  id: 'exemplo',
  label: 'Exemplo percentage',
  color: '#9c27b0',
  type: 'percentage',
  unit: '%',
  data: percentage
}*/];

export default availableDatasets

