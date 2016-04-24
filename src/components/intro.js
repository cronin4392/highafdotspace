import React from 'react';

import Countdown from './countdown';

const Intro = (props) => {
	return (
		<div className="intro">
			<div className="intro--title">
				<p>
					<span>Launch Day </span>
					<span className="float-right">{ props.state['rocket_name'] }</span>
				</p>
				<p>
					Live updates from { props.state['launch_site'] }
				</p>
			</div>
			<Countdown
				time={ props.state['time'] }
				className="intro--countdown"
			/>
			<a className="intro--cta" href="#app">
				<img src="/public/images/up_arrow.png" alt="View" /><br />
				<span>Updates</span>
			</a>
		</div>
	);
}

export default Intro;