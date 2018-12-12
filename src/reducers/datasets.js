import availableDatasets from '../datasets'
console.log(availableDatasets[0].id, availableDatasets[1].id)
const initialState = [availableDatasets[0].id, availableDatasets[1].id]

const datasets = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATASET':
      return state.concat(action.dataset)
    case 'REMOVE_DATASET':
      return state.filter((datasetId) => datasetId !== action.dataset)
    default:
      return state
  }
}

export default datasets