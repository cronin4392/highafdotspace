import React, { Component } from 'react';
import Moment from 'moment';

import Scrubber from './scrubber';
import Countdown from './countdown';

class Interface extends Component {
	constructor(props) {
		super(props);

		this.controlEnabled = false;

		this.onEventSelect = (event) => {
			this.props.onEventSelect(event);
		};

		this.toggleControls = () => {
			if(this.controlEnabled) {
				this.controlEnabled = false;
				this.props.onEventSelect('disable-controls');
			}
			else {
				this.controlEnabled = true;
				this.props.onEventSelect('enable-deviceorient');
			}
		};
	}

	render() {
		const state = this.props.state;

		const countDown = Moment.duration(state['time']['count']);
		const currentTime = Moment(state['time']['current']);
		const launchTime = Moment(state['time']['launch']);

		return (
			<div className="interface">
				<Countdown
					time={ state['time'] }
					abrev={true}
					showLaunch={true}
					className="interface--countdown"
				/>
				<button
					className={"view-toggle " + ( this.controlEnabled ? 'inactive' : 'active' )}
					onClick={() => this.toggleControls() }
				>
					<span className="icon"></span>
				</button>
				<Scrubber
					events={ state['activeEvents'] }
					onEventSelect={this.onEventSelect}
				/>
			</div>
		);
	}
}

export default Interface;