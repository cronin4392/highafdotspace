import React from 'react';
import Moment from 'moment';

import Scrubber from './scrubber';

const Interface = (props) => {
	var state = props['state'];
	const time = Moment(state['time']['count']);

	return (
		<div className="interface">
			<div className="interface--countdown">
				<span className="unit">{ time.format("HH") } Hr</span>
				<span className="unit">{ time.format("mm") } Min</span>
				<span className="unit">{ time.format("ss") } Sec</span>
			</div>
			<Scrubber
				events={ state['events'] }
				onEventSelect={props.onEventSelect}
			/>
		</div>
	);
}

export default Interface;