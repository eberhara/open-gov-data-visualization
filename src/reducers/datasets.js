const datasets = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DATASET':
      return state.concat(action.dataset)
    default:
      return state
  }
}

export default datasets