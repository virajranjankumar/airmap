import React, { PropTypes } from 'react'
import { NumberField } from './TextField'

const BasicSlider = ({ id, value = 0, min = 0, max = 10, step = 1, onChange }) =>
	<input type="range" id={id} min={min} max={max} value={value} step={step} className="mdl-slider mdl-js-slider" onChange={({target: {value}}) => onChange(parseFloat(value))} />

const Slider = ({ id, value = 0, min = 0, max = 10, step = 1, onChange, children }) => 
	<div style={{float:'left'}}>
		<p style={{width: "300px", float: 'left'}}>
			<label htmlFor={id}>{children}</label>
			<BasicSlider id={id} min={min} max={max} value={value} step={step} onChange={onChange} />
		</p>
		<NumberField onChange={onChange} value={value} min={min} max={max} step={step}>{children}</NumberField>
	</div>

Slider.propTypes = { 
	value: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
}

export default Slider