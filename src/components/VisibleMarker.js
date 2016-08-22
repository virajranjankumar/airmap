import StaticMarker from './presentation/StaticMarker'
import { connect } from 'react-redux'
import { updateMarker } from '../actionCreators'
import { SELECT_MARKER } from '../actions'

const find = (arr, id) => arr.find(a => a.id === id)

const getSelectedPolygon = (markers = [], selected) => {
  const {id} = selected
  return find(markers, id)
}

const getVisibility = ({type}, showMap) => type === SELECT_MARKER && showMap

const getPlan = (markersToPlan = [], plans = [], selected = {}) => {
  const {id} = selected
  const selected_marker_id = id
  const plan_ids = markersToPlan.filter(({id}) => id === selected_marker_id).map(({plan_id}) => plan_id)
  const plan = plans.filter(({id}) => plan_ids.includes(id))
  return (plan.length > 0) ? plan[0] : []
}

const mapStateToProps = state => {
  return {
    marker: getSelectedPolygon(state.markers, state.selected),
    isVisible: getVisibility(state.selected, state.showMap),
    plan: getPlan(state.markersToPlan, state.plans, state.selected)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: s => dispatch(updateMarker(s))
  }
}

const VisibleMarker = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticMarker)

export default VisibleMarker