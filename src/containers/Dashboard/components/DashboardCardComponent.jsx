import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Image, Button} from 'semantic-ui-react'

export default class DashboardCardComponent extends Component {
	static propTypes = {
		title: PropTypes.string,
		body: PropTypes.string,
		userId: PropTypes.number,
		id: PropTypes.number,
		src: PropTypes.string,
	};

	render () {
		return (
			<Card raised>
				<Image alt={this.props.title} src={this.props.src}/>
				<Card.Content>
					<Card.Header>
						{this.props.title}
					</Card.Header>
					<Card.Meta>
					</Card.Meta>
				</Card.Content>
			</Card>
		)
	}
}
