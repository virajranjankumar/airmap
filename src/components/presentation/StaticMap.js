import React, { PropTypes } from 'react'
import { Map,  Popup, TileLayer, FeatureGroup, CircleMarker,LayersControl } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw'
import Leaflet from 'leaflet'
import { LANDING_MARKER, MARKER, POLYGON, CIRCLE, NO_FLY_ZONE, CONFLICT_ZONE } from '../../actions'

var overlaps = require('turf-overlaps');

const createIcon = (iconClass) => `<i class="material-icons ${iconClass} md-24">flag</i>`
const startIcon = { html: createIcon('start'), iconAnchor: [5, 20], className: 'transparent' }
const stopIcon  = { html: createIcon('stop'),  iconAnchor: [5, 20], className: 'transparent' }

const DrawingFeatureGroup = ({ onCreate, onUpdate, onDelete, onSelect, onSelectNone, markers = [], polygons = [], circles = [] }) =>
    <FeatureGroup>
        {[...markers, ...circles].forEach(({layer, position}) => (layer.setLatLng) ? layer.setLatLng(position) : null)}
        {markers.forEach(({id, position, marker_type, layer}) => {
          const icon = Leaflet.divIcon((marker_type === LANDING_MARKER) ? stopIcon : startIcon)
          if(layer.setIcon)
            layer.setIcon(icon)
        })}
        {circles.forEach(({layer, radius}) => layer.setRadius(radius))}
        {polygons.forEach(({id, zone_type, layer, positions}) => {
          if(zone_type === NO_FLY_ZONE)
            layer._path.setAttribute('fill', `url(#no_fly_zone)`)
          else if(zone_type === CONFLICT_ZONE)
            layer._path.setAttribute('fill', `url(#conflict_zone)`)
          else
            layer._path.setAttribute('fill', `url(#pattern-${id})`)

          layer._path.setAttribute('fill-opacity', 1)

          const current_positions = layer.toGeoJSON()
          const current_id = id
          
          const conflicts = polygons
          .filter(({id}) => id !== current_id)
          .filter(({layer}) => overlaps(layer.toGeoJSON(), current_positions))
          .forEach(({id}) => layer._path.setAttribute('fill', 'url(#conflict_zone)'))

          if(conflicts) {
            layer._path.setAttribute('fill', 'url(#conflict_zone)')
          }
        })}
        <EditControl
          onEdited={({layers}) => 
            layers.eachLayer(layer => {
              const {id, layerType} = layer.component
              let positions, position, radius

              if(layerType === POLYGON) {
                positions = layer.getLatLngs()
              } else {
                position = layer.getLatLng()
              }

              if(layerType === CIRCLE) {
                radius = layer.getRadius()
              }

              onUpdate({id, layerType, position, positions, radius})
            }
          )}
          onCreated={({layerType, layer, target}) => {
            const id = Date.now()

            let object = {id, layerType, layer}

            layer.component = {id, layerType, layer}
            
            if(layerType === POLYGON) {
                layer._path.setAttribute('fill', `url(#pattern-${id})`)
                layer._path.setAttribute('fill-opacity', 1)
            }

            if(layerType === POLYGON) {
              const positions = layer.getLatLngs()
              object['positions'] = positions
            } else {
              const position = layer.getLatLng()
              object['position'] = position
            }

            if(layerType === CIRCLE) {
              const radius = layer.getRadius()
              object['radius'] = radius
            }

            if(layerType === MARKER) {
              const icon = Leaflet.divIcon(startIcon)
              layer.setIcon(icon)
            }

            onCreate(object)

            switch(layerType) {
              case MARKER:
              case CIRCLE:
              case POLYGON:
                layer.on('click', ({target:{component}}) => onSelect({...component}))
                break;
              default:
                onSelectNone()
                break;
            }
          }}

          onDeleted={({layers}) => layers.eachLayer(({component:{id,layerType}}) => {
            switch(layerType) {
              case MARKER:
              case CIRCLE:
              case POLYGON:
                onDelete({id, layerType})
                break;
              default:
                break;
            }
            onSelectNone()
          })}
          draw={{
            rectangle: false,
            polyline: false,
            polygon: {
              allowIntersection: false
            }
          }}
        />
    </FeatureGroup>

const StaticMap = ({ isVisible = false, onCreate, onUpdate, onDelete, onSelect, onSelectNone, position, address, polygons = [], circles = [], plans = [], markersForPlan = [], editableMarkers = [], markers = [] }) =>
    <Map center={position} zoom={18}>
      <LayersControl>
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Toner">
          <TileLayer
            url='http://tile.stamen.com/toner/{z}/{x}/{y}.png'
            attribution='&copy; Stamen Design, under a <a href="http://creativecommons.org/licenses/by/3.0">Creative Commons Attribution (CC BY 3.0)</a> license.' />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Terrain" checked={true}>
          <TileLayer
            url='http://tile.stamen.com/terrain/{z}/{x}/{y}.png'
            attribution='&copy; Stamen Design, under a <a href="http://creativecommons.org/licenses/by/3.0">Creative Commons Attribution (CC BY 3.0)</a> license.' />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Watercolor">
          <TileLayer
            url='http://tile.stamen.com/watercolor/{z}/{x}/{y}.png'
            attribution='&copy; Stamen Design, under a <a href="http://creativecommons.org/licenses/by/3.0">Creative Commons Attribution (CC BY 3.0)</a> license.' />
        </LayersControl.BaseLayer>
      </LayersControl>
      <DrawingFeatureGroup onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} onSelect={onSelect} onSelectNone={onSelectNone} markers={markers} polygons={polygons} circles={circles} />
      <CircleMarker center={position} onClick={onSelectNone}>
        <Popup><span>{address}</span></Popup>
      </CircleMarker>
    </Map>

StaticMap.propTypes = {
  onMarkerCreate: PropTypes.func,
  onMarkerSelect: PropTypes.func,
  onMarkerDelete: PropTypes.func, 
  onPolygonCreate: PropTypes.func, 
  onPolygonSelect: PropTypes.func, 
  onPolygonDelete: PropTypes.func, 
  onCircleCreate: PropTypes.func, 
  onCircleSelect: PropTypes.func, 
  onCircleDelete: PropTypes.func, 
  onSelectNone: PropTypes.func, 
  position: PropTypes.array, 
  address: PropTypes.string,
  plan_id: PropTypes.number.isRequired
}

export default StaticMap