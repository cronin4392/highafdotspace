import React from 'react';
import Moment from 'moment';

import Scrubber from './scrubber';
import Countdown from './countdown';

const Interface = ({state, onEventSelect}) => {
	const countDown = Moment.duration(state['time']['count']);
	const currentTime = Moment(state['time']['current']);
	const launchTime = Moment(state['time']['launch']);

	let controlsEnabled = false;

	return (
		<div className="interface">
			<Countdown
				time={ state['time'] }
				abrev={true}
				className="interface--countdown"
			/>
			<button
				className="view-toggle"
				onClick={() => {
					onEventSelect('toggle-controls');
					controlsEnabled = !controlsEnabled;
				}}
			>
				Toggle!
			</button>
			<Scrubber
				events={ state['activeEvents'] }
				onEventSelect={onEventSelect}
			/>
		</div>
	);
}

export default Interface;