import { SearchField } from './presentation/TextField'
import { connect } from 'react-redux'
import { fetchLocationIfNeeded } from '../actionCreators'

const getVisibility = (showMap) => showMap

const mapStateToProps = state => {
  return {
    value: state.searchTerm,
    items: state.locations.items,
    isVisible: getVisibility(state.showMap)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: searchTerm => dispatch(fetchLocationIfNeeded(searchTerm))
  }
}

const VisibleSearchField = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField)

export default VisibleSearchField