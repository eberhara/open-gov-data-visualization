import _ from 'lodash'
  
const normalizeData = (data = {}) => {
  const years = Object.keys(data)
  const yearsData = Object.values(data)
  const allTimeHigherValue = _.maxBy(yearsData, 'total').total

  years.forEach(year => {
    const yearData = { ...data[year] }
    const monthHigherValue = _.max(yearData.detailed)

    data[year] = {
      detailed: yearData.detailed.map((value) => value * 100 / monthHigherValue),
      total: yearData.total * 100 / allTimeHigherValue
    }
  })

  return data
}

const normalize = (dataset = {}) => {
  if (dataset.type !== 'absolute') return dataset

  return {
    ...dataset,
    data: normalizeData(dataset.data)
  }
}

export default normalize



