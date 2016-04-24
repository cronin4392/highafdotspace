import React from 'react';
import Moment from 'moment';

import Scrubber from './scrubber';

const Interface = (props) => {
	var state = props['state'];
	const countDown = Moment.duration(state['time']['count']);
	const currentTime = Moment(state['time']['current']);
	const launchTime = Moment(state['time']['launch']);

	return (
		<div className="interface">
			<div className="interface--countdown">
				<span className="unit">{ countDown.hours() } Hr</span>
				<span className="unit">{ countDown.minutes() } Min</span>
				<span className="unit">{ countDown.seconds() } Sec</span>
				{/*
				<span className="unit">{ currentTime.format() }</span>
				<span className="unit">{ launchTime.format() }</span>
				*/}
			</div>
			<Scrubber
				events={ state['events'] }
				onEventSelect={props.onEventSelect}
			/>
		</div>
	);
}

export default Interface;