import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactUpdate from 'react-addons-update';
import Moment from 'moment';

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
				current: Moment(),
				count: 0,
				launch: 0
			}
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
						<Interface state={this.state} />
					</div>
				</div>
			</div>
		);
	}

	loadData() {
		this.setState(
			ReactUpdate(this.state, {
				time: {
					launch: {$set: Moment(data['launch_time'] * 1000)}
				}
			})
		);
	}

	onTimeChange() {
		// console.log( this.state['time']['launch'].format(), this.state['time']['current'].format() )

		this.setState(
			ReactUpdate(this.state, {
				time: {
					current: {$set: Moment()},
					count: {$set: Moment(this.state['time']['launch'].diff(this.state['time']['current']))}
				}
			})
		);
	}
}

ReactDOM.render(<App />, document.getElementsByClassName('container')[0]);