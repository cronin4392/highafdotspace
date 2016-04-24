import React from 'react';

const Intro = (props) => {
	return (
		<div className="intro">
			<div className="intro--title">
				<span className="block">Launch Day</span>
				<span className="block">{ props.state['mission']['name'] }</span>
			</div>
			<div className="intro--background">
				<img src="/public/images/ship-black.png" />
			</div>
			<a className="intro--cta" href="#app">
				<span>Updates</span>
			</a>
		</div>
	);
}

export default Intro;