import React, { Component } from 'react';
import $ from 'jquery';
import IFrame from 'react-iframe';

class Stream extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var iframe = $('iframe')[0];

		iframe.addEventListener('load', function(e) {
			var frame = e.target;
			window.addEventListener("message", function(event) {
				if(event['data'] == 'loaded') {
					$(window).on('eventSelect', function(event, eventName) {
						frame.contentWindow.postMessage({eventName: eventName}, '*');
					});		
				}
			}, false);
		});
	}

	render() {
		return (
			<div className="stream">
				<IFrame url="http://highafdotspace3d.herokuapp.com/" />
			</div>
		);
	}
}

export default Stream;