import Plan from './presentation/Plan'
import { connect } from 'react-redux'
import { createPlan, readPlan, updatePlan, deletePlan } from '../actionCreators'

import { createMarker, fetchLocationIfNeeded, selectMarker, addMarkerToPlan } from '../actionCreators'

const mapStateToProps = state => {
  return {
    plan: state.plans.find(({id}) => id === state.currentPlan),
    plans: state.plans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: ({id, name}) => dispatch(updatePlan({id, name})),
    onCreate: id => dispatch(createPlan({id})),
    onRead: id => dispatch(readPlan({id})),
    onDelete: id => dispatch(deletePlan({id})),

    updatePlanName: ({id, name}) => dispatch(updatePlan({id, name})),
    addMarker: ({id, position, layer, plan_id}) => {
      dispatch(createMarker({id, position, layer}))
      dispatch(addMarkerToPlan({id, plan_id}))
    },
    updateSearch: searchTerm => dispatch(fetchLocationIfNeeded(searchTerm)),
    selectMarker: id => dispatch(selectMarker({id})),
  }
}

const VisiblePlan = connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan)

export default VisiblePlan