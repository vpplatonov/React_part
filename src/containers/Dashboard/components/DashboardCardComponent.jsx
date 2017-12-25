import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Image} from 'semantic-ui-react'

export default class DashboardCardComponent extends Component {
	static propTypes = {
		title: PropTypes.string,
		body: PropTypes.string,
		userId: PropTypes.number,
		id: PropTypes.number,
		src: PropTypes.string,
		extra: PropTypes.func,
		render: PropTypes.func,
	};

	render () {
		return (
			<Card raised color='olive'>
				<Card.Content>
					<Card.Header>
					</Card.Header>
					{this.props.title}
					{this.props.src &&
					<Image alt={this.props.title} src={this.props.src}/>
					}
					{this.props.render && this.props.render(this.props)}
					<Card.Meta>
					</Card.Meta>
				</Card.Content>
				{this.props.extra &&
					// extra has opacity 0.4
				<Card.Content extra>
					{this.props.extra(this.props.extra)}
				</Card.Content>
				}
			</Card>
		)
	}
}
