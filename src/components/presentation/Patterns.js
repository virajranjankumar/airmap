import React, { PropTypes } from 'react'

export const Pattern = ({ id, distance = 10, angle = 45, stroke = 'red', strokeWidth = 3 }) =>
	<pattern id={id} width={distance} height={distance} patternTransform={`rotate(${angle} 0 0)`} patternUnits="userSpaceOnUse">
		<line x1="0" y1="0" x2="0" y2={distance} style={{stroke, strokeWidth}} />
	</pattern>

const Patterns = ({ patterns = [] }) =>
	<g>
		{patterns.map(({ id, distance, angle, color }) => <Pattern id={`pattern-${id}`}  key={`pattern-${id}`} distance={distance} angle={angle} stroke={color} />)}
	</g>

Patterns.propTypes = {
  patterns: PropTypes.array
}

export default Patterns