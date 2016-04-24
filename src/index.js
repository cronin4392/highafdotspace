import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactUpdate from 'react-addons-update';
import Moment from 'moment';
import _ from 'lodash';
import $ from 'jquery';

import Intro from './components/intro';
import Stream from './components/stream';
import Interface from './components/interface';

// var trackpad = new Trackpad(document);
import Ajax from './modules/ajax';
import data from '../public/api/data.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: {
				current: Moment(1455104040000),
				count: 0,
				launch: 0
			},
			events: {}
		}
	}

	componentDidMount() {
		this.loadData();
		setInterval(function() {
			this.onTimeChange();
		}.bind(this), 1000);
	}

	render() {
		return (
			<div>
				<div className="scroller">
					{ /*
					<div className="screen">
						<Intro />
					</div>
					*/ }
					<div className="screen" id="app">
						<Stream />
						<Interface
							state={this.state}
							onEventSelect={ this.onEventSelect }
						/>
					</div>
				</div>
			</div>
		);
	}

	onEventSelect(event) {
		console.log('detect in index', event);
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

		var feed = _.sortBy(data['feed'], 'timestamp');
		feed = _.filter(feed, {'visible': true});
		this.setState({
			'events': feed
		});
	}

	onTimeChange() {
		// fake getting "current time". just add 1 to state['time']['current'] since not actually now
		var lastCurrentTime = this.state['time']['current'].valueOf();
		var newCurrentTime = Moment(lastCurrentTime + 1000);
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
	}
}

ReactDOM.render(<App />, document.getElementsByClassName('container')[0]);