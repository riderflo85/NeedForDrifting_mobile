import React from 'react';
import { View, Text, StatusBar } from 'react-native';


class ListServer extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View>
                <StatusBar backgroundColor="#0d96d1" barStyle="light-content"/>
            </View>
        );
    }

}


export default ListServer;