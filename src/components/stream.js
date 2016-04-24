import React, { Component } from 'react';
import $ from 'jquery';
import IFrame from 'react-iframe';

class Stream extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var iframe = $('iframe')[0];

		if(iframe) {
			iframe.addEventListener('load', (e) => {
				var frame = e.target;
				window.addEventListener("message", (event) => {
					if(event['data'] == 'loaded') {
						this.props.onStreamLoad(frame);
					}
				}, false);
			});
		}
	}

	render() {
		return (
			<div className="stream">
				{/*
				<IFrame url="http://highafhdotspace3dalt.herokuapp.com/" />
				<IFrame url="http://localhost:3000" />
				*/}
				<IFrame url="http://highafhdotspace3dalt.herokuapp.com/" />
			</div>
		);
	}
}

export default Stream;