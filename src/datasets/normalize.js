import _ from 'lodash'
  
const normalizeData = (dataset = {}) => {
  const { data } = dataset
  
  const years = Object.keys(data)
  const yearsData = Object.values(data)
  const allTimeHigherValue = _.maxBy(yearsData, 'total').total
  const allTimeLowerValue = _.minBy(yearsData, 'total').total * 0.9
  const allMonths = _.flatten(yearsData.map(({ detailed }) => detailed))
  const allMonthsHigherValue = _.max(allMonths)
  const allMonthsLowerValue = _.min(allMonths) * 0.9

  years.forEach(year => {
    let normalized = {}
    const yearData = { ...data[year] }
  
    if (dataset.type !== 'absolute') {
      normalized = {
        detailed: yearData.detailed,
        total: yearData.total
      }
    } else {
      normalized = {
        detailed: yearData.detailed.map((value) => (value - allMonthsLowerValue) * 100 / (allMonthsHigherValue - allMonthsLowerValue)),
        total: (yearData.total - allTimeLowerValue) * 100 / (allTimeHigherValue - allTimeLowerValue)
      }
    }
    
    data[year] = {
      ...yearData,
      normalized
    }
  })

  return data
}

const normalize = (dataset = {}) => ({
    ...dataset,
    data: normalizeData(dataset)
  }
)

export default normalize
