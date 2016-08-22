import React from 'react';
import './App.css';

import { connect } from 'react-redux'

import VisibleMarker from './components/VisibleMarker'
import VisiblePolygon from './components/VisiblePolygon'
import VisibleCircle from './components/VisibleCircle'
import VisiblePlan from './components/VisiblePlan'
import VisibleMap from './components/VisibleMap'
import VisibleSearchField from './components/VisibleSearchField'
import VisiblePatterns from './components/VisiblePatterns'
import { Pattern } from './components/presentation/Patterns'

const NoFlyZonePattern = () => <Pattern id="no_fly_zone" stroke='red'/>
const PlanZonePattern = () => <Pattern id="plan_zone" stroke='yellow'/>
const ConflictZonePattern = () => <Pattern id="conflict_zone" stroke='purple' strokeWidth={10} />

const Planner = ({ isVisible }) => 
  isVisible ? 
  <div>
    <VisibleMap />
  </div> : null

const mapStateToProps = state => {
  return {
    isVisible: state.showMap && (state.currentPlan > 0)
  }
}

const VisiblePlanner = connect(
  mapStateToProps
)(Planner)

const Main = () => 
  <section className="mdl-layout__tab-panel is-active" id="plan-tab">
    <VisiblePlan />
    <VisiblePlanner />
    <VisibleSearchField />
    <VisiblePolygon />
    <VisibleMarker />
    <VisibleCircle />
    <svg id="patterns">
      <NoFlyZonePattern />
      <PlanZonePattern />
      <ConflictZonePattern />
      <VisiblePatterns />
    </svg>
  </section>

const App = () => <Main />

export default App;