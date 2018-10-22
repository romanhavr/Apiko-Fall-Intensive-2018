import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Main from './components/main';
import ScrollToTop from './components/scroll-to-top';

class App extends Component {

	render() {
		return (
			<Router>
				<ScrollToTop>
				<div className='app'>
					<h1 className='box'>TODO app</h1>
					<Main />					
				</div>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;