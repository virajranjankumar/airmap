import Circle from './presentation/Circle'
import { connect } from 'react-redux'
import { createCircleHeight, updateCircleHeight, deleteCircleHeight } from '../actionCreators'
import { updateCircle } from '../actionCreators'
import { SELECT_CIRCLE } from '../actions'

const find = (arr, id) => arr.find(a => a.id === id)

const getSelectedCircle = (circles, selected) => {
  const {id} = selected
  return find(circles, id)
}

const getVisibility = ({type}, showMap) => type === SELECT_CIRCLE && showMap

const getHeights = (heights, selected) => {
  const {id} = selected
  return heights.filter(({parent_id}) => parent_id === id)
}

const mapStateToProps = state => {
  return {
    heights: getHeights(state.heights, state.selected),
    circle: getSelectedCircle(state.circles, state.selected),
    isVisible: getVisibility(state.selected, state.showMap)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: s => dispatch(updateCircle(s)),
    onCircleHeightCreate: ({id, parent_id}) => dispatch(createCircleHeight({id, parent_id})),
    onCircleHeightUpdate: ({id, height, heading}) => dispatch(updateCircleHeight({id, height, heading})),
    onCircleHeightDelete: id => dispatch(deleteCircleHeight({id})),
    onEdit: ({id, inEditMode}) => dispatch(updateCircleHeight({id, inEditMode})),
  }
}

const VisibleCircle = connect(
  mapStateToProps,
  mapDispatchToProps
)(Circle)

export default VisibleCircle