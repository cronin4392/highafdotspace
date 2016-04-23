import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Stream from './components/stream';
import Interface from './components/interface';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}

		// YTSearch({key: YT_API_KEY, term: 'surfboards'}, videos => {
		// 	this.setState({
		// 		videos: videos,
		// 		selectedVideo: videos[0]
		// 	});
		// });
	}

	render() {
		return (
			<div>
				<Stream />
				<Interface />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementsByClassName('container')[0]);