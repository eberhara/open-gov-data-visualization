const initialState = {
  filtering: false,
  yearInit: 2000,
  yearEnd: 2017,
  shouldRenderMonths: false
}

const dates = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE_FILTER':
      return {
        filtering: true,
        yearInit: action.yearInit,
        yearEnd: action.yearEnd,
        shouldRenderMonths: (action.yearEnd - action.yearInit) <= 5
      }

    case 'SET_BEGIN_DATE_FILTER':
      return {
        ...state,
        filtering: true,
        yearInit: action.yearInit,
        shouldRenderMonths: (state.yearEnd - action.yearInit) <= 5
      }

    case 'SET_END_DATE_FILTER':
      return {
        ...state,
        filtering: true,
        yearEnd: action.yearEnd,
        shouldRenderMonths: (action.yearEnd - state.yearInit) <= 5
      }
    case 'CLEAR_DATE_FILTER':
      return initialState
    default:
      return state
  }
}

export default dates