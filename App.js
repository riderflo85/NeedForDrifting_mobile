import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import Login from './components/login';
import BottomNavigation from './navigation/navigation';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<BottomNavigation/>
			</Provider>
		);
	}
}

