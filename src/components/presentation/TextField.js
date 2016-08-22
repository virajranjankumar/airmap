import React, { PropTypes } from 'react'

const TextField  = ({ onChange, value = '', id = 0, children }) => 
  <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${value !== '' ? 'is-dirty' : ''}`}>
    <input className="mdl-textfield__input" type="text" id={id} onChange={({target: {value}}) => onChange(value)} value={value} />
    <label className="mdl-textfield__label" htmlFor={id}>{children}</label>
  </div>

TextField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.number,
  children: PropTypes.string
}

export default TextField

export const NumberField  = ({ onChange, value = 0, id = 0, min = 0, max = 1, step= 0.1, children, error = 'Input is not a number', disabled = false }) => 
  <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${value !== '' ? 'is-dirty' : ''}`}>
    <input className="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id={id} onChange={({target: {value}}) => onChange(parseFloat(value, 10))} value={value} min={min} max={max} step={step} disabled={disabled ? 'disabled' : ''}/>
    <label className="mdl-textfield__label" htmlFor={id}>{children}</label>
    <span className="mdl-textfield__error">{error}!</span>
  </div>

export const ColorField  = ({ onChange, value = '', id = 0, children }) => 
  <div>
    <label htmlFor={id}>{children}:  </label>
    <input type="color" id={id} onChange={({target: {value}}) => onChange(value)} value={value} />
  </div>

export const SearchField = ({ onChange, isVisible, value = '', items = [], children }) => 
  <form style={{display: isVisible ? 'block' : 'none'}}>
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
      <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="serchField">
        <i className="material-icons">search</i>
      </label>
      <div className="mdl-textfield__expandable-holder">
        <input className="mdl-textfield__input" type="text" id="serchField" list="searchFieldList" onChange={({target: {value}}) => onChange(value)} value={value}/>
        <label className="mdl-textfield__label" htmlFor="sample-expandable">{children}</label>
      </div>
    </div>
    <datalist id="searchFieldList">
      {items.map(({address}) => <option key={address} value={address}/>)}
    </datalist>
  </form>

SearchField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  items: PropTypes.array,
  children: PropTypes.string
}

export const LatLngField = ({ onUpdate, id, position = {}, disabled = '' }) => {
  const {lat, lng} = position
  return (
    <fieldset>
      <legend>Position</legend>
      <NumberField  onChange={lat => onUpdate({id, position:{lat, lng}})} value={lat} min={-90} max={90} step={0.01} id={'nf'+id} error="Input is outside the values {-90, 90}" disabled={disabled}>Latitude</NumberField>
      <NumberField  onChange={lng => onUpdate({id, position:{lat, lng}})} value={lng} min={-180} max={180} step={0.01} id={'nf'+id} error="Input is outside the values {-180, 180}" disabled={disabled}>Longitude</NumberField>
    </fieldset>)
}