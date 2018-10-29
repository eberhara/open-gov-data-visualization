export const setDateFilter = (yearInit, yearEnd) => ({
  type: 'SET_DATE_FILTER',
  yearInit, yearEnd
})

export const setBeginDateFilter = (yearInit) => ({
  type: 'SET_BEGIN_DATE_FILTER',
  yearInit
})

export const setEndDateFilter = (yearEnd) => ({
  type: 'SET_END_DATE_FILTER',
  yearEnd
})


export const clearDateFilter = () => ({
  type: 'CLEAR_DATE_FILTER'
})
