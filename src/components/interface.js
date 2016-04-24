import React from 'react';
import Moment from 'moment';

import Scrubber from './scrubber';
import Countdown from './countdown';

const Interface = (props) => {
	var state = props['state'];
	const countDown = Moment.duration(state['time']['count']);
	const currentTime = Moment(state['time']['current']);
	const launchTime = Moment(state['time']['launch']);

	return (
		<div className="interface">
			<Countdown
				time={ state['time'] }
				abrev={true}
				className="interface--countdown"
			/>
			<Scrubber
				events={ state['activeEvents'] }
				onEventSelect={props.onEventSelect}
			/>
		</div>
	);
}

export default Interface;