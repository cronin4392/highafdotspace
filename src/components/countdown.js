import React from 'react';
import Moment from 'moment';
import MomentDurationFormat from 'moment-duration-format';

const Countdown = ({time, abrev = false, className = ''}) => {
	const countDown = Moment.duration(time['count']);
	const currentTime = Moment(time['current']);
	const launchTime = Moment(time['launch']);

	let hours = Math.max(0, countDown.format('HH') % 24).toString();
	let minutes = Math.max(0, countDown.format('mm') % 60).toString();
	let seconds = Math.max(0, countDown.format('ss') % 60).toString();
	if(hours.length < 2) {
		hours = '0' + hours;
	}
	if(minutes.length < 2) {
		minutes = '0' + minutes;
	}
	if(seconds.length < 2) {
		seconds = '0' + seconds;
	}

	const counting = (parseInt(hours,10) + parseInt(minutes, 10) + parseInt(seconds, 10) > 0);

	const strings = [
		[
			'Hours',
			'Minutes',
			'Seconds'
		],
		[
			'Hr',
			'Min',
			'Sec'
		]
	]

	const stringsKey = abrev ? 1 : 0;

	return (
		<div className={className + " countdown " + (!counting ? 'launching' : '')}>
			<span className={ "block block-countdown " + (hours <= 0 ? 'faded' : '')}>
				<span className="number">{ hours }</span>
				<span> {strings[stringsKey][0]}</span>
			</span>
			<span className={ "block block-countdown " + ((minutes <= 0 && hours <= 0) ? 'faded' : '')}>
				<span className="number">{ minutes }</span>
				<span> {strings[stringsKey][1]}</span>
			</span>
			<span className={ "block block-countdown " + ((seconds <= 0 && minutes <= 0 && hours <= 0) ? 'faded' : '')}>
				<span className="number">{ seconds }</span>
				<span> {strings[stringsKey][2]}</span>
			</span>
			{/*
			<span className="block">{ currentTime.format('HH:mm:ss') }</span>
			<span className="unit">{ launchTime.format() }</span>
			*/}
			<span className="block block-launching">
				Launching
			</span>
		</div>
	);
}

export default Countdown;