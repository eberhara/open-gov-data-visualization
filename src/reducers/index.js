import { combineReducers } from 'redux'
import datasets from './datasets'
import dates from './dates'

export default combineReducers({
  datasets,
  dates
})