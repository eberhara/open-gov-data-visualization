import availableDatasets from '../datasets'
const initialState = [availableDatasets[0].id, availableDatasets[1].id, availableDatasets[2].id, availableDatasets[3].id, availableDatasets[4].id, availableDatasets[5].id]

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