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
  <div>
    <VisibleMap />
  </div>

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
    <div className="plan">
      <VisiblePlan />
    </div>
    <div className="map">
      <VisiblePlanner />
    </div>
    <div className="search">
      <VisibleSearchField />
    </div>
    <div className="shapes">
      <VisiblePolygon />
      <VisibleMarker />
      <VisibleCircle />
    </div>
    <svg id="patterns">
      <NoFlyZonePattern />
      <PlanZonePattern />
      <ConflictZonePattern />
      <VisiblePatterns />
    </svg>
  </section>

const Header = () =>
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Flight Planner</span>
      <div className="mdl-layout-spacer"></div>
    </div>
  </header>

const App = () => 
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <main className="mdl-layout__content">
      <Main />
    </main>
  </div>

export default App;