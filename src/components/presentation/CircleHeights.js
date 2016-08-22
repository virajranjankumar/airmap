import React, { PropTypes } from 'react'

const CircleHeights = ({ heights = [], parent_id, onCreate, onUpdate, onDelete, onEdit }) =>
	<table className="mdl-data-table mdl-shadow--2dp">
		<thead>
			<tr>
				<th>Height</th>
				<th>Angle</th>
				<th className="mdl-data-table__cell--non-numeric" colSpan={2}>Actions</th>
			</tr>
		</thead>
		<tbody className="heights">
		{heights.map(({id, height, heading, inEditMode}, i) => 
			<tr key={i}>
				<td>{inEditMode ?
					<input type="number" value={height} onChange={({target:{value}}) => onUpdate({height: parseFloat(value, 10), heading, id} )} min={0} step={0.1} max={1000}/>:<span>{height}</span>}
				</td>
				<td>{inEditMode ?
					<input type="number" value={heading} onChange={({target:{value}}) => onUpdate({heading: parseFloat(value, 10), height, id} )} min={0} max={360} step={0.1}/>:<span>{heading}</span>}
				</td>
				<td className="mdl-data-table__cell--non-numeric">
					<button onClick={e => {e.preventDefault(); onEdit({id, inEditMode:(!inEditMode)})}} className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons">{inEditMode ? "save" : "edit" }</i></button>
				</td>
				<td className="mdl-data-table__cell--non-numeric">
					<button onClick={e => {e.preventDefault(); onDelete(id)}} className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons">delete</i></button>
				</td>
			</tr>)}
		{heights.length === 0 ? <tr><td></td><td colSpan={2}>No Heights Specified</td><td></td></tr> : null}
		</tbody>
		<tfoot>
			<tr>
				<td></td>
				<td></td>
				<td colSpan={2}><button onClick={e => {
					e.preventDefault()
					const id = Date.now()
					onCreate({id, parent_id})
				}} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"><i className="material-icons">add</i></button></td>
			</tr>
		</tfoot>
	</table>

CircleHeights.propTypes = {
	heights: PropTypes.array,
	parent_id: PropTypes.number,
	onCreate: PropTypes.func,
	onUpdate: PropTypes.func,
	onDelete: PropTypes.func
}

export default CircleHeights