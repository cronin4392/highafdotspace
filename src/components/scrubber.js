import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';

class Scrubber extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.eventLength = 0;
		this.eventsUpdated = false;
		this.scrollerWidth = this.refs.scrubber.scrollWidth;
	}

	componentWillReceiveProps(nextProps) {
		if(this.eventLength !== (nextProps['events'].length || 0)) {
			this.eventsUpdated = true;
		}
	}

	componentDidUpdate(prevProps) {
		if(this.eventsUpdated) {
			this.eventsUpdated = false;
			this.gotoEvent(this.props.events.length - 1);
			this.scrollerWidth = this.refs.scrubber.scrollWidth;
		}
		if(this.props.events.length) {
			this.eventLength = this.props.events.length;
		}
	}

	render() {
		const events = this.props.events;
		let eventItems = '';

		if(events.length) {
			eventItems = events.map((eventItem, index) => {
				var stream = eventItem['stream'] || {};
				var camera = stream['camera'] || null;

				// console.log( event['timestamp'],  );
				return (
					<button
						className="scrubber--event"
						data-event-name={eventItem['name']}
						data-event-camera={camera}
						key={index}
						ref={'scrubberEvent['+index+']'}
						onClick={() => this.gotoEvent(index, true)}
					>
						<span className="scrubber--event--dot">
						</span>
						<span className="scrubber--event--time">
							{Moment(eventItem.timestamp * 1000).format('HH:mm:ss')}
						</span>
					</button>
				)
			});
		}

		return (
			<div className="scrubber" ref="scrubber">
				{eventItems}
			</div>
		);
	}

	gotoEvent(index, force = false) {
		var $scrubber = this.refs.scrubber;
		var atPresent = $scrubber.scrollLeft + $scrubber.clientWidth == this.scrollerWidth;

		if(atPresent || force) {
			var eventItem = this.props.events[index];
			var $scrubberEvent = this.refs['scrubberEvent['+index+']'];
			var scrollTo = $scrubberEvent.offsetLeft + ($scrubberEvent.clientWidth / 2) - ($scrubber.clientWidth / 2);
			$scrubber.scrollLeft = scrollTo;
			this.props.onEventSelect(eventItem['stream']['camera']);
		}
	}
}

export default Scrubber;