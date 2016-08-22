import React, { PropTypes } from 'react'
import TextField from './TextField'

const cancelSumbit = e => {
	e.preventDefault()
}

const Plan = ({onNameChange, onCreate, onRead, onDelete, plan = {}, plans = []}) => {
	let {id = 0, name = ''} = plan
	return (<form onSubmit={cancelSumbit} className="leftMargin">
			<TextField onChange={name => {
				if(id === 0)
					onCreate()
				else 
					onNameChange({id, name})
			}} value={name} id={id}>Plan Name</TextField>
			{(plans.length === 0) ?
			<a className="mdl-button mdl-js-button mdl-button--icon" onClick={onCreate}>
			  <i className="material-icons">add</i>
			</a> : null}
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