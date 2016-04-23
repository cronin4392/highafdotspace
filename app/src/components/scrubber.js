import React from 'react';
import Moment from 'moment';

const Scrubber = ({events}) => {
	if(events.length) {
		const eventItems = events.map((event, index) => {
			return (
				<div
					className="scrubber--event"
					key={index}
				>
					<span className="scrubber--event--time">
						{Moment(event.timestamp * 1000).format('HH:mm:ss')}
					</span>
				</div>
			)
		});

		return (
			<div className="scrubber">
				{eventItems}
			</div>
		);
	}
	else {
		return <div></div>;
	}
}

export default Scrubber;