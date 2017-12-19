import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

/**
 * Component that protects route from unauthorized users.
 */
class RouteAuth extends Component {
	static propTypes = {
		canAccess: PropTypes.func,
		path: PropTypes.string
	}

	render () {
		const {canAccess, path} = this.props

		return canAccess(path) ? <Route {...this.props} /> : <Redirect to="/login" />
	}
}

export default RouteAuth
