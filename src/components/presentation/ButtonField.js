import React, { PropTypes } from 'react'

const ButtonField = ({onClick, children}) => 
	<button onClick={onClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">{children}</button>

ButtonField.propTypes = { 
	onClick: PropTypes.func, 
	children: PropTypes.string
}

export default ButtonField