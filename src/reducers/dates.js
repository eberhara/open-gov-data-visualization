const initialState = {
  filtering: false,
  yearInit: 2000,
  yearEnd: 2017
}

const dates = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE_FILTER':
      return {
        filtering: true,
        yearInit: action.yearInit,
        yearEnd: action.yearEnd,
      }
    case 'CLEAR_DATE_FILTER':
      return initialState
    default:
      return state
  }
}

export default dates