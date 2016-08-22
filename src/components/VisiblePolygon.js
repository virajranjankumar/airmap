import Polygon from './presentation/Polygon'
import { connect } from 'react-redux'
import { updatePolygon } from '../actionCreators'
import { SELECT_POLYGON } from '../actions'

const find = (arr, id) => arr.find(a => a.id === id)

const getSelectedPolygon = (polygons, selected) => {
  const {id} = selected
  return find(polygons, id)
}

const getVisibility = ({type}, showMap) => type === SELECT_POLYGON && showMap

const mapStateToProps = state => {
  return {
    polygon: getSelectedPolygon(state.polygons, state.selected),
    isVisible: getVisibility(state.selected, state.showMap)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: s => dispatch(updatePolygon(s))
  }
}

const VisiblePolygon = connect(
  mapStateToProps,
  mapDispatchToProps
)(Polygon)

export default VisiblePolygon