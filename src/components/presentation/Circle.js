import React, { PropTypes } from 'react'
import TextField, { NumberField, LatLngField } from './TextField'
import LatLngTable from './LatLngTable'
import CircleHeights from './CircleHeights'

const Circle = ({onUpdate, onCircleHeightCreate, onCircleHeightUpdate, onCircleHeightDelete, isVisible, onEdit, circle = {}, heights = []}) => {
	let {id = 0, name = '', position, radius = 0} = circle
	return (
		<form style={{display: isVisible ? 'block' : 'none'}}>
		<TextField  onChange={name => onUpdate({id, name})} value={name} id={id}>Name</TextField>
		<br />
		<NumberField onChange={radius => onUpdate({id, radius})} value={radius} id={id} min={0.01} max={Infinity} error='Input is out of range' disabled={true}>Radius (meters)</NumberField>
		<br />
		<LatLngField onUpdate={onUpdate} position={position} id={id} disabled={false}/>
		<br />
		<LatLngTable positions={[position]} />
		<br />
		<CircleHeights heights={heights} onCreate={onCircleHeightCreate} onUpdate={onCircleHeightUpdate} onDelete={onCircleHeightDelete} onEdit={onEdit} parent_id={id} />
		</form>)
}

Circle.propTypes = {
	onUpdate: PropTypes.func,
	onCircleHeightCreate: PropTypes.func,
	onCircleHeightUpdate: PropTypes.func,
	onCircleHeightDelete: PropTypes.func,
	isVisible: PropTypes.bool,
	circle: PropTypes.object
}

export default Circle