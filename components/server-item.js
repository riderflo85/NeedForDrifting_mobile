import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { itemServerStyle } from '../static/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


class ServerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server: this.props.server,
        }
    }

    _stateServer(status) {
        let colorLight = 'white';

        if (status === 'running') {
            colorLight = '#009900';
        } else if (status === 'stoping') {
            colorLight = '#ff2418';
        } else {
            colorLight = '#9900ff';
        }
        return <View style={[itemServerStyle.stateServerColor, {backgroundColor: colorLight}]}></View>
    }

    render() {
        const displayServerDetail = this.props.displayServerDetail;
        const status = this.props.statusServ;
        console.log(status);
        return (
            <TouchableOpacity
                style={itemServerStyle.container}
                onPress={() => displayServerDetail(this.state.server.id)}
            >
                <View style={itemServerStyle.section}>
                    <View style={itemServerStyle.stateServerBloc}>
                        <MaterialCommunityIcons name="traffic-light" size={30} color="black"/>
                        {this._stateServer(status)}
                    </View>
                    <View style={itemServerStyle.nameServer}>
                        <Text>{this.state.server.name}</Text>
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