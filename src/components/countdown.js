import React from 'react';
import Moment from 'moment';
import MomentDurationFormat from 'moment-duration-format';

const Countdown = ({time, className = ''}) => {
	const countDown = Moment.duration(time['count']);
	const currentTime = Moment(time['current']);
	const launchTime = Moment(time['launch']);

	const hours = Math.max(0, countDown.format('HH') % 24);
	const minutes = Math.max(0, countDown.format('mm') % 60);
	const seconds = Math.max(0, countDown.format('ss') % 60);

	return (
		<div className={className + " countdown"}>
			<span className={ "block " + (hours <= 0 ? 'faded' : '')}>
				<span className="number">{ hours }</span>
				<span> Hr</span>
			</span>
			<span className={ "block " + ((minutes <= 0 && hours <= 0) ? 'faded' : '')}>
				<span className="number">{ minutes }</span>
				<span> Min</span>
			</span>
			<span className={ "block " + ((seconds <= 0 && minutes <= 0 && hours <= 0) ? 'faded' : '')}>
				<span className="number">{ seconds }</span>
				<span> Sec</span>
			</span>
			{/*
			<span className="block">{ currentTime.format('HH:mm:ss') }</span>
			<span className="unit">{ launchTime.format() }</span>
			*/}
		</div>
	);
}

export default Countdown;