import _ from 'lodash'
  
const normalizeData = (dataset = {}) => {
  const { data } = dataset
  
  const years = Object.keys(data)
  const yearsData = Object.values(data)
  const allTimeHigherValue = _.maxBy(yearsData, 'total').total

  years.forEach(year => {
    let normalized = {}
    const yearData = { ...data[year] }
  
    if (dataset.type !== 'absolute') {
      normalized = {
        detailed: yearData.detailed,
        total: yearData.total
      }
    } else {
      const monthHigherValue = _.max(yearData.detailed)
      normalized = {
        detailed: yearData.detailed.map((value) => value * 100 / monthHigherValue),
        total: yearData.total * 100 / allTimeHigherValue
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
