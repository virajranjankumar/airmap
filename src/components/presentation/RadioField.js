import React, { PropTypes } from 'react'

const RadioField = ({ onChange, id, name, value, children, defaultChecked = true }) =>
  <label className={`mdl-radio mdl-js-radio mdl-js-ripple-effect is-upgraded ${defaultChecked ? 'is-checked' : ''}`} htmlFor={id}>
    <input type="radio" id={id} className="mdl-radio__button" name={name} value={value} onChange={({target: {value}}) => onChange(value)} defaultChecked={defaultChecked}/>
    <span className="mdl-radio__label">{children}</span>
  </label>

RadioField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  children: PropTypes.string,
  defaultChecked: PropTypes.bool
}

export default RadioField