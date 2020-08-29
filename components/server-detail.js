import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { serverDetailStyle } from '../static/styles';
import UpdateTrack from './update-track';


class DetailServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server: this.props.servers.filter(el => el.id === this.props.route.params.idServer)[0]
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({title: this.state.server.name})
    }

    _stateServer() {
        const serverStatus = this.state.server.status;
        let colorLight = 'white';

        if (serverStatus === 'running') {
            colorLight = '#009900';
        } else if (serverStatus === 'stoping') {
            colorLight = '#ff2418';
        }
        return <View style={[serverDetailStyle.stateServerColor, {backgroundColor: colorLight}]}></View>
    }

    render() {        
        return (
            <View style={serverDetailStyle.container}>
                <KeyboardAwareScrollView>
                    <ScrollView>
                        <View style={[serverDetailStyle.borderAndColorBloc, serverDetailStyle.dataServer]}>
                            <View style={serverDetailStyle.headerBloc}>
                                <View style={{justifyContent: 'center', marginRight: 10}}>
                                    <MaterialCommunityIcons name="traffic-light" size={45} color="black"/>
                                    {this._stateServer()}
                                </View>
                                <Text style={serverDetailStyle.titleServer}>{this.state.server.name}</Text>
                            </View>
                            <View style={serverDetailStyle.bodyBloc}>
                                <View style={serverDetailStyle.iconsView}>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="file-outline" size={25} color="#053448"/>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="car" size={25} color="#053448"/>
                                    <MaterialCommunityIcons style={{marginBottom: 15}} name="go-kart-track" size={25} color="#053448"/>
                                </View>
                                <View style={serverDetailStyle.dataView}>
                                    <Text style={{marginBottom: 15, flexWrap: 'wrap'}}>/home/acServer/acServerPro/bin/savegame/cfg/linux/init.cfg</Text>
                                    <Text style={{marginBottom: 15}}>/home/acServer/acServerPro/bin/savegame/cfg/linux/car.list</Text>
                                    <Text style={{marginBottom: 15}}>{this.state.server.track}</Text>
                                </View>
                            </View>
                        </View>
                        <UpdateTrack/>
                        <View style={[serverDetailStyle.borderAndColorBloc, serverDetailStyle.actionServer]}>
                            <View style={[serverDetailStyle.buttonAction, {backgroundColor: '#16a0b6', borderWidth: 3, borderColor: '#148c9f'}]}>
                                <MaterialCommunityIcons name="information-outline" size={30} color="white"/>
                            </View>
                            <View style={[serverDetailStyle.buttonAction, {backgroundColor: '#28a745', borderWidth: 3, borderColor: '#23903c'}]}>
                                <MaterialCommunityIcons name="play-speed" size={30} color="white"/>
                            </View>
                            <View style={[serverDetailStyle.buttonAction, {backgroundColor: '#ffc107', borderWidth: 3, borderColor: '#e6ac00'}]}>
                                <MaterialCommunityIcons name="restart" size={30} color="white"/>
                            </View>
                            <View style={[serverDetailStyle.buttonAction, {backgroundColor: '#dc3545', borderWidth: 3, borderColor: '#c32232'}]}>
                                <MaterialCommunityIcons name="stop-circle-outline" size={30} color="white"/>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData,
    };
}


export default connect(mapStateToProps)(DetailServer);