import Plan from './presentation/Plan'
import { connect } from 'react-redux'
import { createPlan, readPlan, updatePlan, deletePlan } from '../actionCreators'

const mapStateToProps = state => {
  return {
    plan: state.plans.find(({id}) => id === state.currentPlan),
    plans: state.plans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: ({id, name}) => dispatch(updatePlan({id, name})),
    onCreate: () => dispatch(createPlan({id: Date.now()})),
    onRead: id => dispatch(readPlan({id})),
    onDelete: id => dispatch(deletePlan({id}))
  }
}

const VisiblePlan = connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan)

export default VisiblePlan