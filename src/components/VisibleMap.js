import StaticMap from './presentation/StaticMap'
import { connect } from 'react-redux'
import  {
  createMarker,
  updateMarker,
  deleteMarker,
  createPolygon,
  updatePolygon,
  deletePolygon,
  createCircle,
  updateCircle,
  deleteCircle,
  selectPolygon,
  selectCircle,
  selectMarker,
  addCircleToPlan,
  addMarkerToPlan,
  addPolygonToPlan,
  removeCircleToPlan,
  removeMarkerToPlan,
  removePolygonToPlan,
  selectNone
} from '../actionCreators'

import { MARKER, CIRCLE, POLYGON } from '../actions'

const latLngToPosition = (item = {}) => {
  const {lat = 37.793697, lng = -122.401731} = item
  return [lat, lng]
}

const searchTermToAddress = (searchTerm) => (searchTerm === "") ? 'Home Base' : searchTerm

const filterItemsForPlan = (allItems = [], itemsToPlan = [], plan__id) => {
  const item_ids = itemsToPlan.filter(({id, plan_id}) => plan_id === plan__id).map(({id}) => id)
  return allItems.filter(({id}) => item_ids.includes(id))
}

const getVisibility = (showMap) => showMap
const getPlanId = (currentPlan) => {
  window.currentPlan = currentPlan
  return currentPlan
}
const getPlans = (plans = []) => plans

const markersForPlan = (plans = [], markers = [], markersToPlan = []) =>
  plans.map(({id}) => {
    const current_plan_id = id
    const current_plan_marker_ids = markersToPlan.filter(({plan_id}) => plan_id === current_plan_id).map(({id}) => id)
    const current_plan_markers = markers.filter(({id}) => current_plan_marker_ids.includes(id))
    return {[current_plan_id]: current_plan_markers}
  })

const editableMarkersForCurrentPlan = (plans, markers, markersToPlan, currentPlan) => markersForPlan(plans, markers, markersToPlan)[currentPlan]

const mapStateToProps = state => {
  return {
    position: latLngToPosition(state.locations.items[0]),
    address: searchTermToAddress(state.searchTerm),
    polygons: filterItemsForPlan(state.polygons, state.polygonsToPlan, state.currentPlan),
    circles: filterItemsForPlan(state.circles, state.circlesToPlan, state.currentPlan),
    markers: filterItemsForPlan(state.markers, state.markersToPlan, state.currentPlan),
    isVisible: getVisibility(state.showMap),
    plan_id: getPlanId(state.currentPlan),
    plans: getPlans(state.plans),
    markersForPlan: markersForPlan(state.plans, state.markers, state.markersToPlan),
    editableMarkers:editableMarkersForCurrentPlan(state.plans, state.markers, state.markersToPlan, state.currentPlan),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreate: ({layerType, id, position, positions, radius, layer}) => {
      const plan_id = window.currentPlan
      switch(layerType) {
        case CIRCLE:
          dispatch(createCircle({id, position, radius, layer}))
          dispatch(addCircleToPlan({id, plan_id}))
          break;
        case MARKER:
          dispatch(createMarker({id, position, layer}))
          dispatch(addMarkerToPlan({id, plan_id}))
          break;
        case POLYGON:
          dispatch(createPolygon({id, positions, layer}))
          dispatch(addPolygonToPlan({id, plan_id}))
          break;
        default:
          break;
      }
    },
    onUpdate: ({layerType, id, position, radius}) => {
      switch(layerType) {
        case CIRCLE:
          dispatch(updateCircle({id, position, radius}))
          break;
        case MARKER:
          dispatch(updateMarker({id, position}))
          break;
        case POLYGON:
          dispatch(updatePolygon({id, position}))
          break;
        default:
          break;
      }
    },
    onSelect: ({layerType, id}) => {
        switch(layerType) {
          case CIRCLE:
            dispatch(selectCircle({id}))
            break;
          case MARKER:
            dispatch(selectMarker({id}))
            break;
          case POLYGON:
            dispatch(selectPolygon({id}))
            break;
          default:
            break;
        }
    },
    onDelete: ({layerType, id, plan_id}) => {
      switch(layerType) {
        case CIRCLE:
          dispatch(deleteCircle({id}))
          dispatch(removeCircleToPlan({id, plan_id}))
          break;
        case MARKER:
          dispatch(deleteMarker({id, plan_id}))
          dispatch(removeMarkerToPlan({id, plan_id}))
          break;
        case POLYGON:
          dispatch(deletePolygon({id, plan_id}))
          dispatch(removePolygonToPlan({id, plan_id}))
          break;
        default:
          break;
      }      
    },
    onSelectNone: () => dispatch(selectNone())
  }
}

const VisibleMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticMap)

export default VisibleMap