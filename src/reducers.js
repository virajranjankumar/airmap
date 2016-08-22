import {
  CREATE_PLAN,
  READ_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  CREATE_MARKER,
  //READ_MARKER,
  UPDATE_MARKER,
  DELETE_MARKER,
  CREATE_POLYGON,
  //READ_POLYGON,
  UPDATE_POLYGON,
  DELETE_POLYGON,
  CREATE_CIRCLE,
  //READ_CIRCLE,
  UPDATE_CIRCLE,
  DELETE_CIRCLE,
  CREATE_CIRCLE_HEIGHT,
  UPDATE_CIRCLE_HEIGHT,
  DELETE_CIRCLE_HEIGHT,  
  SELECT_POLYGON,
  SELECT_CIRCLE,
  SELECT_MARKER,
  SELECT_NONE,
  INVALIDATE_SEARCH,
  SEARCH_LOCATION,
  REQUEST_LOCATION,
  RECEIVE_LOCATION,
  UPDATE_CIRCLE_HEIGHT_EDIT,
  ADD_CIRCLE_TO_PLAN,
  ADD_MARKER_TO_PLAN,
  ADD_POLYGON_TO_PLAN,
  REMOVE_CIRCLE_TO_PLAN,
  REMOVE_MARKER_TO_PLAN,
  REMOVE_POLYGON_TO_PLAN,
} from './actions'

import { combineReducers } from 'redux'
/*
const initialState = {
  markers: [],
  circles: [],
  polygons: [],
  patterns: [],
  plans: [],
  selected: null,
  searchTerm: '',
  locations: {
    isFetching: true,
    didInvalidate: false,
    items: []
  },
  edit:[]
}


const state  = {
  markers: [{
    id: 1,
    name: 'Marker',
    marker_type: 'Start'
  }],
  circles: [{
    id: 2,
    name: 'Circle',
  }],
  polygon: [{
    id: 21,
    name: 'Plan',
    zone_type: 'No Fly Zone',
    distance: 10,
    angle: 45
  }],
  patterns: [{
    id: 'pattern-21',
    angle: 45,
    distance: 10
  }],
  heights: [{
    id: 32,
    heading: 40,
    height: 2
  }],
  plans: [{
    id: 2,
    name: 'Plan',
  }],
  markersToPlan: [{
    marker:1,
    plan: 2
  }],
  selected: 21,
  currentPlan: 1
}
*/

const commonCreate = (state, {payload}) => [ ...state, payload ]

const commonUpdate = (state, {payload}) => {
	const id = payload.id
	const index = state.findIndex(e => e.id  === id)
	const updated = {...state[index], ...payload}
	return [ ...state.slice(0, index), updated ,...state.slice(index + 1)]
}

const commonDelete = (state, {payload:{id}}) => {
	const index = state.findIndex(e => e.id  === id)
	return [ ...state.slice(0, index), ...state.slice(index + 1)]	
}

const selected = (state = {type:SELECT_NONE, id:null}, action) => {
  switch(action.type) {
    case SELECT_POLYGON:
    case SELECT_CIRCLE:
    case SELECT_MARKER:
      return {...action.payload, type:action.type}
    case SELECT_NONE:
      return {id:null, type:action.type}
    default:
      return state
  }
}

const reducer = (create, update, remove) =>
  (state = [], action) => {
    switch(action.type) {
      case create:
        return commonCreate(state, action)
      case update:
        return commonUpdate(state, action)
      case remove:
        return commonDelete(state, action)
      default:
        return state;
    }
  }

const NONE = "NONE"
const plans    = reducer(CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN)
const markers  = reducer(CREATE_MARKER, UPDATE_MARKER, DELETE_MARKER)
const polygons = reducer(CREATE_POLYGON, UPDATE_POLYGON, DELETE_POLYGON)
const patterns = reducer(CREATE_POLYGON, UPDATE_POLYGON, DELETE_POLYGON)
const circles  = reducer(CREATE_CIRCLE, UPDATE_CIRCLE, DELETE_CIRCLE)
const heights  = reducer(CREATE_CIRCLE_HEIGHT, UPDATE_CIRCLE_HEIGHT, DELETE_CIRCLE_HEIGHT)

const markersToPlan  =  reducer(ADD_MARKER_TO_PLAN, NONE, REMOVE_MARKER_TO_PLAN)
const polygonsToPlan = reducer(ADD_POLYGON_TO_PLAN, NONE, REMOVE_POLYGON_TO_PLAN)
const circlesToPlan  =  reducer(ADD_CIRCLE_TO_PLAN, NONE, REMOVE_CIRCLE_TO_PLAN)

/*
const plans = (state = [], action) => {
  switch(action.type) {
    case CREATE_PLAN:
      return commonCreate(state, action)
    case UPDATE_PLAN:
      return commonUpdate(state, action)
    case DELETE_PLAN:
      return commonDelete(state, action)
    case READ_PLAN:
    default:
      return state;
  }
}

const markers = (state = [], action) => {
  switch(action.type) {
    case CREATE_MARKER:
      return commonCreate(state, action)
    case UPDATE_MARKER:
    	return commonUpdate(state, action)
    case DELETE_MARKER:
    	return commonDelete(state, action)
    case READ_MARKER:
    default:
      return state;
  }
}

const polygons = (state = [], action) => {
  switch(action.type) {
    case CREATE_POLYGON:
      return commonCreate(state, action)
    case UPDATE_POLYGON:
    	return commonUpdate(state, action)
    case DELETE_POLYGON:
    	return commonDelete(state, action)
    case READ_POLYGON:
    default:
      return state;
  }
}

const patterns = (state = [], action) => {
  switch(action.type) {
    case CREATE_POLYGON:
      return commonCreate(state, action)
    case UPDATE_POLYGON:
      return commonUpdate(state, action)
    case DELETE_POLYGON:
      return commonDelete(state, action)
    case READ_POLYGON:
    default:
      return state;
  }
}

const circles = (state = [], action) => {
  switch(action.type) {
    case CREATE_CIRCLE:
      return commonCreate(state, action)
    case UPDATE_CIRCLE:
      return commonUpdate(state, action)
    case DELETE_CIRCLE:
      return commonDelete(state, action)
    case READ_CIRCLE:
    default:
      return state;
  }
}

const heights = (state = [], action) => {
  switch(action.type) {
    case CREATE_CIRCLE_HEIGHT:
      return commonCreate(state, action)
    case UPDATE_CIRCLE_HEIGHT:
      return commonUpdate(state, action)
    case DELETE_CIRCLE_HEIGHT:
      return commonDelete(state, action)
    default:
      return state
  }
}
*/
const searchTerm = (state = '', action) => {
  switch(action.type) {
    case SEARCH_LOCATION:
      return action.payload.searchTerm
    default:
      return state
  }
}

const currentPlan = (state = 0, action) => {
  switch(action.type) {
    case CREATE_PLAN:
    case READ_PLAN:
      return action.payload.id
    default:
      return state
  }
}

const locations = (state = {isFetching: false, didInvalidate: false, items: []}, action) => {
  switch(action.type) {
    case INVALIDATE_SEARCH:
      return {...state, didInvalidate:true}
    case REQUEST_LOCATION:
      return {...state, didInvalidate:false, isFetching:true }
    case RECEIVE_LOCATION:
      return {...state, didInvalidate:false, isFetching:false, items:action.payload.locations, lastUpdated:action.payload.receivedAt}
    default:
      return state
  }
}

const edit = (state = [], action) => {
  switch(action.type) {
    case UPDATE_CIRCLE_HEIGHT_EDIT:
      if(state.includes(action.payload.id)) {
        return state.filter(s => s !== action.payload.id)
      } else {
        return [...state, action.payload.id]
      }
    default:
      return state
  }
}

const showMap = (state = false, action) => {
  switch(action.type) {
    case CREATE_PLAN:
    case READ_PLAN:
    case UPDATE_PLAN:
      return true
    case DELETE_PLAN:
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
	circles, polygons, markers, selected, 
  heights, searchTerm, locations, edit,
  patterns, plans, currentPlan,
  markersToPlan, circlesToPlan, polygonsToPlan,
  showMap
})

export default rootReducer