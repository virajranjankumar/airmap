import React, { PropTypes } from 'react'
import TextField from './TextField'
import { Marker } from 'react-leaflet';
import Leaflet from 'leaflet'

const HelpButton = ({ updatePlanName, addMarker, updateSearch, selectMarker, id = 0 }) => 
	<a className="mdl-button mdl-js-button mdl-button--icon" onClick={() => {
		let intro = introJs()
		
		window.demo_id = Date.now()

		const createIcon = (iconClass) => `<i class="material-icons ${iconClass} md-24">flag</i>`
		const startIcon = { html: createIcon('start'), iconAnchor: [5, 20], className: 'transparent' }

		intro.setOptions({
			hints: [
				{
					element: document.querySelector('.plan'),
					hint: 'Update the title of the plan here. Currently you are working on one flight plan.',
					hintPosition: 'top-left'
				},
				{
					element: document.querySelector('.map'),
					hint: 'Edit the plan graphically on the map',
					hintPosition: 'top-middle'
				},
				{
					element: document.querySelector('.map'),
					hint: 'Use the tools from the controls below to add, edit and remove plans, markers and flight columns',
					hintPosition: 'top-left'
				},
				/*
				{
					element: document.querySelector('.map'),
					hint: 'Switch between map types and tiles.',
					hintPosition: 'top-right'
				},
				*/
				{
					element: document.querySelector('.search'),
					hint: 'Type here to search and move to locations on the map',
					hintPosition: 'top-left'
				},
				{
					element: document.querySelector('.shapes'),
					hint: 'Details of the selected plan will be displayed here',
					hintPosition: 'top-middle'
				},
			]
		});

		intro.onhintclose(stepId => {
			const plan_id = id
			switch(stepId) {
				case 0:
					updatePlanName({id:plan_id, name: "Scan of Corn Field"})
					break
				case 1:
					const position = {lat: 37.793697, lng: -122.401731}
					const icon = Leaflet.divIcon(startIcon)
					const layer = (<Marker position={position} icon={icon}></Marker>)
					addMarker({id:window.demo_id, position, layer, plan_id})
					break
				case 2:
					break;
				case 3:
					updateSearch('343 Sansome Street, Suite 1050 San Francisco, CA 94104')
					break;
				case 4:
					selectMarker(window.demo_id)
					break;
				default:
					break;
			}
		})
		intro.addHints();
	}}>
		<i className="material-icons">help_outline</i>
	</a>

const Plan = ({onNameChange, onCreate, onRead, onDelete, plan = {}, plans = [], updatePlanName, addMarker, updateSearch, selectMarker }) => {
	let {id = 0, name = ''} = plan
	if(id === 0) {
		id = Date.now()
		onCreate({id})
	}
	return (<form onSubmit={e => e.preventDefault()} className="leftMargin">
			<TextField onChange={name => { onNameChange({id, name})}} value={name} id={id}>Plan Name</TextField>
			<HelpButton id={id} updatePlanName={updatePlanName} addMarker={addMarker} updateSearch={updateSearch} selectMarker={selectMarker} />
			{/*
			<a id="edit-plan-menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon">
				<i className="material-icons">add</i>
			</a>
			<ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="edit-plan-menu-lower-right">
				{plans.map(({id, name}) => <li key={id} className="mdl-menu__item" onClick={() => onRead(id)}>{name}</li>)}
				{(plans.length === 0) ? <li className={(plans.length > 0) ? "mdl-menu__item mdl-menu__item--full-bleed-divider" : "mdl-menu__item"} onClick={onCreate}><a>Create Plan</a></li> : null}
				{(plans.length > 0) ? <li className="mdl-menu__item" onClick={() => onDelete(plan.id)}><a>Remove Plan</a></li> : null}
			</ul>*/}
		</form>)
}

Plan.propTypes = {
	onNameChange: PropTypes.func,
	plans: PropTypes.array,
	plan: PropTypes.object,
}

export default Plan