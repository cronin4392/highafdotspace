import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';

class Scrubber extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setTimeout(function() {
			var scrubber = this.refs.scrubber;
			scrubber.scrollLeft = scrubber.scrollWidth;
		}.bind(this), 10)
	}

	render() {
		const events = this.props.events;
		if(events.length) {
			const eventItems = events.map((event, index) => {
				var stream = event['stream'] || {};
				var camera = stream['camera'] || null;

				return (
					<div
						className="scrubber--event"
						data-event-name={event['name']}
						data-event-camera={camera}
						key={index}
						onClick={() => this.props.onEventSelect(camera)}
					>
						<span className="scrubber--event--time">
							{Moment(event.timestamp * 1000).format('HH:mm:ss')}
						</span>
					</div>
				)
			});

			return (
				<div className="scrubber" ref="scrubber">
					{eventItems}
				</div>
			);
		}
		else {
			return <div></div>;
		}
	}
}

export default Scrubber;