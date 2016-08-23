import fetch from 'isomorphic-fetch'
import {
	CREATE_PLAN,
	READ_PLAN,
	UPDATE_PLAN,
	DELETE_PLAN,
	CREATE_MARKER,
	READ_MARKER,
	UPDATE_MARKER,
	DELETE_MARKER,
	CREATE_POLYGON,
	READ_POLYGON,
	UPDATE_POLYGON,
	DELETE_POLYGON,
	CREATE_CIRCLE,
	READ_CIRCLE,
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
	TAKE_OFF_MARKER,
	PLAN_ZONE,
} from './actions'

const action = (type, p = {}) => payload => { return { payload: {...payload, ...p }, type } }

export const createPlan 		= action(CREATE_PLAN, 	{ name:'', id:1 } )
export const createMarker 		= action(CREATE_MARKER, { name:'Take Off', marker_type:TAKE_OFF_MARKER } )
export const createPolygon 		= action(CREATE_POLYGON,{ name:'Scanning Plan', zone_type:PLAN_ZONE, distance:5, angle:45, color:'#ffff00' } )
export const createCircle 		= action(CREATE_CIRCLE, { name:'Scanning Column' } )
export const createCircleHeight = action(CREATE_CIRCLE_HEIGHT, { height:1, heading:0 } )

export const readPlan   = action(READ_PLAN)
export const updatePlan = action(UPDATE_PLAN)
export const deletePlan = action(DELETE_PLAN)

export const readMarker   = action(READ_MARKER)
export const updateMarker = action(UPDATE_MARKER)
export const deleteMarker = action(DELETE_MARKER)

export const readPolygon   = action(READ_POLYGON)
export const updatePolygon = action(UPDATE_POLYGON)
export const deletePolygon = action(DELETE_POLYGON)

export const readCircle 			= action(READ_CIRCLE)
export const updateCircle 			= action(UPDATE_CIRCLE)
export const updateCircleHeight 	= action(UPDATE_CIRCLE_HEIGHT)
export const updateCircleHeightEdit = action(UPDATE_CIRCLE_HEIGHT_EDIT)
export const deleteCircle 			= action(DELETE_CIRCLE)
export const deleteCircleHeight 	= action(DELETE_CIRCLE_HEIGHT)

export const selectPolygon = action(SELECT_POLYGON)
export const selectCircle  = action(SELECT_CIRCLE)
export const selectMarker  = action(SELECT_MARKER)
export const selectNone    = action(SELECT_NONE)

export const addCircleToPlan     = action(ADD_CIRCLE_TO_PLAN)
export const addMarkerToPlan     = action(ADD_MARKER_TO_PLAN)
export const addPolygonToPlan    = action(ADD_POLYGON_TO_PLAN)
export const removeCircleToPlan  = action(REMOVE_CIRCLE_TO_PLAN)
export const removeMarkerToPlan  = action(REMOVE_MARKER_TO_PLAN)
export const removePolygonToPlan = action(REMOVE_POLYGON_TO_PLAN)

export const searchLocation   = action(SEARCH_LOCATION)
export const invalidateSearch = action(INVALIDATE_SEARCH)
const requestLocation 		  = action(REQUEST_LOCATION)

const receiveLocation = ({json:{results}, searchTerm}) => { 
	return { 
		payload: {
			locations: results.map(({geometry:{location}, formatted_address}) => { 
				return {...location, address:formatted_address}
			}),
			receivedAt: Date.now()
		},
		type:RECEIVE_LOCATION
	}
}

const fetchLocation = searchTerm => {
	return dispatch => {
		dispatch(requestLocation({searchTerm}))
		return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}`)
			.then(response => response.json())
			.then(json => dispatch(receiveLocation({json, searchTerm})))
	}
}

const shouldFetchLocation = (state) => {
	const {locations, searchTerm} = state
	if(searchTerm.length < 3) {
		return false
	}
	if(locations.isFetching) {
		return false
	} else {
		return !locations.didInvalidate
	}
}

export const fetchLocationIfNeeded = (searchTerm) =>
	(dispatch, getState) => {
		dispatch(searchLocation({searchTerm}))
		const state = getState()
		if(shouldFetchLocation(state)) {
			let {searchTerm} = state
			return dispatch(fetchLocation(searchTerm))
		}
	}