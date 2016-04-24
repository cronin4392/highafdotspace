import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import _ from 'lodash';

class Scrubber extends Component {
	constructor(props) {
		super(props);

		this.scrollAnimating = false;
	}

	componentDidMount() {
		this.eventLength = 0;
		this.eventsUpdated = false;
		this.scrollerWidth = this.refs.scrubber.scrollWidth;

		Draggable.create(
			this.refs.scrubber,
			{
				type: "scrollLeft",
				edgeResistance: 0.5,
				throwProps: true,
				// onDragStart: function() {
				// 	if(window.appDraggable) {
				// 		window.appDraggable[0].disable();
				// 		console.log(window.appDraggable[0]);
				// 	}
				// },
				// onDragEnd: function() {
				// 	if(window.appDraggable) {
				// 		window.appDraggable[0].enable();
				// 	}
				// }
			}
		)

		this.detectScrollPagination();
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

				return (
					<button
						className="scrubber--event"
						data-event-name={eventItem['name']}
						data-event-index={index}
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
			// $scrubber.scrollLeft = scrollTo;
			TweenLite.to($scrubber, 1, {
				scrollTo:{x: scrollTo},
				ease:Power2.easeOut,
				onStart: () => {
					this.scrollAnimating = true;
				},
				onComplete: () => {
					this.scrollAnimating = false;
				}
			});
			this.props.onEventSelect(eventItem['stream']['camera']);
		}
	}

	detectScrollPagination() {
		const scrollPagination = _.debounce((target) => { this.scrollPagination(target) }, 300);

		var $scrubber = this.refs.scrubber;
		$scrubber.addEventListener('scroll', (e) => {
			// scrollPagination(e.target);
		});
	}

	scrollPagination($scrubber) {
		if(!this.scrollAnimating) {
			var middle = [
				$scrubber.getBoundingClientRect().left + ($scrubber.clientWidth / 2),
				$scrubber.getBoundingClientRect().top + ($scrubber.clientHeight / 2)
			];
			var el = document.elementFromPoint(middle[0], middle[1]);
			if(el && el.classList.contains('scrubber--event')) {
				var id = el.getAttribute('data-event-index');
				this.gotoEvent(id, true);
			}
		}
	}
}

export default Scrubber;