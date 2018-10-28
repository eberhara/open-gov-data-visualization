import availableDatasets from './available-datasets'
import normalize from './normalize'

const getDatasets = (datasetIds = []) => datasetIds
  .map(id => availableDatasets.find((availableDataset) => availableDataset.id === id))
  .map(normalize)

export default getDatasets