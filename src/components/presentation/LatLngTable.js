import React, { PropTypes } from 'react'

const LatLngTable = ({ isVisible, positions = []}) =>
	<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
	  <thead>
	    <tr>
	      <th>Latitude</th>
	      <th>Longitude</th>
	    </tr>
	  </thead>
	  <tbody>
	  	{positions.map((position = {}, i) => {
	  		let {lat, lng} = position
	  		return <tr key={i}><td>{lat}</td><td>{lng}</td></tr>
	  	})}
	  </tbody>
	</table>

LatLngTable.propTypes = {
	isVisible: PropTypes.bool,
	polygon: PropTypes.object
}

export default LatLngTable