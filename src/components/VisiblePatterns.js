import Patterns from './presentation/Patterns'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    patterns: state.polygons,
  }
}

const VisiblePatterns = connect(
  mapStateToProps
)(Patterns)

export default VisiblePatterns