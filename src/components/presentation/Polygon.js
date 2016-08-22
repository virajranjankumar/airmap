import React, { PropTypes } from 'react'
import TextField, { ColorField } from './TextField'
import RadioField from './RadioField'
import Slider from './Slider'
import LatLngTable from './LatLngTable'
import { NO_FLY_ZONE, PLAN_ZONE, CONFLICT_ZONE } from '../../actions'

const Polygon = ({ onUpdate, isVisible, polygon = {}}) => {
	let {name = '', id = 2, zone_type = '', distance = 0, angle = 0, color = '#ffff00', positions = []} = polygon
    return (
      <form style={{display: isVisible ? 'block' : 'none'}}>
      	<TextField  onChange={name => onUpdate({id, name})} value={name} id={id}>Plan Name</TextField>
      	<br />
  		<fieldset>
      		<legend>Area Properties</legend>
	        <radiogroup>
		        <RadioField onChange={zone_type => onUpdate({id, zone_type})} name="zone_type" id="plan_zone_radio_input" defaultChecked={ zone_type === PLAN_ZONE} value={PLAN_ZONE}>Plan Zone</RadioField><br />
		        <RadioField onChange={zone_type => onUpdate({id, zone_type})} name="zone_type" id="no_fly_zone_radio_input" defaultChecked={ zone_type === NO_FLY_ZONE} value={NO_FLY_ZONE}>No Fly Zone</RadioField>
	        </radiogroup>
	    </fieldset>
	    <br />
	    {(zone_type === PLAN_ZONE) ?
		<fieldset>
			<legend>Flight Properties</legend>
			<Slider min={1} max={100} step={0.1} value={distance} id="flight_path_distance" onChange={distance => onUpdate({id, distance})}>Distance between sweeps</Slider>
			<Slider min={0} max={180} step={0.1} value={angle} 	  id="flight_path_angle" 	onChange={angle => onUpdate({id, angle})}>Bearing in Degrees</Slider>
			<ColorField  onChange={color => onUpdate({id, color})} value={color} id={'color-' + id}>Path Color</ColorField>
		</fieldset> : null}
		{(zone_type === CONFLICT_ZONE ) ? <b>The planned areas should not overlay</b> : null}
		<br />
		<LatLngTable positions={positions} />
      </form>)
}

Polygon.propTypes = {
	onUpdate: PropTypes.func,
	isVisible: PropTypes.bool,
	polygon: PropTypes.object
}

export default Polygon