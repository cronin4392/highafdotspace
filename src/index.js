import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactUpdate from 'react-addons-update';
import Moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';

import Intro from './components/intro';
import Stream from './components/stream';
import Interface from './components/interface';

import data from '../public/api/data.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: {
				// current: Moment(1455104040000), // 1 el
				current: Moment(1455104220000), // 2 el
				// current: Moment(1455104270000),
				count: 0,
				launch: 0
			},
			mission: {},
			events: {},
			activeEvents: {},
		}
	}

	componentDidMount() {
		var interval = 500;
		this.loadData();
		setInterval(function() {
			this.onTimeChange();
		}.bind(this), interval);

		// window.appDraggable = Draggable.create(
		// 	this.refs.scroller,
		// 	{
		// 		type: "scrollTop",
		// 		edgeResistance: 1,
		// 		throwProps: true,
		// 		snap: function(endValue) {
		// 			return Math.round(-1 * endValue / window.innerHeight) * window.innerHeight;
		// 		}
		// 	}
		// )
	}

	render() {
		return (
			<div>
				<div className="scroller" ref="scroller">
					<div className="screen screen-passover">
						<div className="screen--wrapper">
							<Intro 
								state={this.state}
							/>
						</div>
					</div>
					<div className="screen screen-fixed" id="app">
						<div className="screen--wrapper">
							<Stream />
							<Interface
								state={this.state}
								onEventSelect={ this.onEventSelect }
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	onEventSelect(event) {
		console.log('Event dispatched', event);
		$(window).trigger('eventSelect', event);
	}

	loadData() {
		this.setState(
			ReactUpdate(this.state, {
				time: {
					launch: {$set: Moment(data['launch_time'] * 1000)}
				}
			})
		);

		this.setState({
			'mission': data['mission']
		})

		var feed = _.sortBy(data['feed'], 'timestamp');
		feed = _.filter(feed, {'visible': true});
		this.setState({
			'events': feed
		});

		setTimeout(function() {
			this.onTimeChange();
		}.bind(this), 10);
	}

	onTimeChange() {
		// fake getting "current time". just add 1 to state['time']['current'] since not actually now
		var interval = 1000;
		var lastCurrentTime = this.state['time']['current'].valueOf();
		var newCurrentTime = Moment(lastCurrentTime + interval);
		var launchTime = this.state['time']['launch'];

		var diff = launchTime.diff(newCurrentTime);

		this.setState(
			ReactUpdate(this.state, {
				time: {
					current: {$set: newCurrentTime},
					count: {$set: diff}
				}
			})
		);

		var activeEvents = _.filter(this.state['events'], function(event) {
			var greaterThan = (event['timestamp'] <= (newCurrentTime.valueOf() / 1000));
			return greaterThan;
		});

		if(activeEvents.length !== this.state['activeEvents'].length) {
			this.setState({
				'activeEvents': activeEvents
			})
		}
	}
}

ReactDOM.render(<App />, document.getElementsByClassName('container')[0]);