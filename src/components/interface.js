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
				<span className="block">{ countDown.hours() } Hr</span>
				<span className="block">{ countDown.minutes() } Min</span>
				<span className="block">{ countDown.seconds() } Sec</span>
				<span className="block">{ currentTime.format('HH:mm:ss') }</span>
				{/*
				<span className="unit">{ launchTime.format() }</span>
				*/}
			</div>
			<Scrubber
				events={ state['activeEvents'] }
				onEventSelect={props.onEventSelect}
			/>
		</div>
	);
}

export default Interface;