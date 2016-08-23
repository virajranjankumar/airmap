import React, { PropTypes } from 'react'
import TextField from './TextField'
import RadioField from './RadioField'
import LatLngTable from './LatLngTable'
import { TAKE_OFF_MARKER, LANDING_MARKER } from '../../actions'

const StaticMarker = ({onUpdate, isVisible, plan, marker = {}}) => {
	const {id = 1, name = '', marker_type = TAKE_OFF_MARKER, position = {}} = marker
	return (
		<form style={{display: isVisible ? 'block' : 'none'}}>
		<TextField  onChange={name => onUpdate({id, name})} value={name} id={id}>Name</TextField>
		<br />
		<fieldset>
			<legend>Marker Type</legend>
			<radiogroup>
				<RadioField onChange={marker_type => onUpdate({id, marker_type})} name="marker_type" id="start_radio_input" defaultChecked={marker_type === TAKE_OFF_MARKER} value={TAKE_OFF_MARKER}>Takeoff</RadioField><br />
				<RadioField onChange={marker_type => onUpdate({id, marker_type})} name="marker_type" id="stop_radio_input" defaultChecked={marker_type === LANDING_MARKER} value={LANDING_MARKER}>Landing</RadioField>
			</radiogroup>
		</fieldset>
		<br />
		<LatLngTable positions={[position]} />
		</form>)
}

StaticMarker.propTypes = {
	onUpdate: PropTypes.func,
	isVisible: PropTypes.bool,
	marker: PropTypes.object
}

export default StaticMarker