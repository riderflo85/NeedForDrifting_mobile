import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Login from './components/login';
import BottomNavigation from './navigation/navigation';

export default class App extends React.Component {
	render() {
		return (
			<BottomNavigation/>
		);
	}
}

