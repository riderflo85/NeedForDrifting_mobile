import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { itemServerStyle } from '../static/styles';
import { listServersStyle } from '../static/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


class ServerItem extends React.Component {
    constructor(props) {
        super(props);
        this.server = this.props.server;
    }

    _stateServer() {
        const serverStatus = this.props.server.status;
        let colorLight = 'white';

        if (serverStatus === 'running') {
            colorLight = '#009900';
        } else if (serverStatus === 'stoping') {
            colorLight = '#ff2418';
        }
        return <View style={[itemServerStyle.stateServerColor, {backgroundColor: colorLight}]}></View>
    }

    render() {
        const displayServerDetail = this.props.displayServerDetail;

        return (
            <TouchableOpacity
                style={itemServerStyle.container}
                onPress={() => displayServerDetail(this.server.id)}
            >
                <View style={itemServerStyle.section}>
                    <View style={itemServerStyle.stateServerBloc}>
                        <MaterialCommunityIcons name="traffic-light" size={30} color="black"/>
                        {this._stateServer()}
                    </View>
                    <View style={itemServerStyle.nameServer}>
                        <Text>{this.server.name}</Text>
                    </View>
                    <View style={itemServerStyle.rightArrow}>
                        <MaterialCommunityIcons name={Platform.OS === 'ios' ? "chevron-right" : "arrow-right"} size={25} color="#0d96d1"/>
                    </View>
                </View>
                <View style={itemServerStyle.separator}></View>
            </TouchableOpacity>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData,
    };
}


export default connect(mapStateToProps)(ServerItem);