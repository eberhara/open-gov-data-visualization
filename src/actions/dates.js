export const setDateFilter = (yearInit, yearEnd) => ({
  type: 'SET_DATE_FILTER',
  yearInit, yearEnd
})

export const clearDateFilter = () => ({
  type: 'CLEAR_DATE_FILTER'
})