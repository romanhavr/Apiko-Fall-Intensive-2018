import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Main from './components/main';

class App extends Component {

	render() {
		return (
			<Router>
				<div className='app'>
					<h1 className='box'>TODO app</h1>
					<Main />					
				</div>
			</Router>
		);
	}
}

export default App;