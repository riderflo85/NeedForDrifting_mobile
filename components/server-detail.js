import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { serverDetailStyle } from '../static/styles';
import UpdateTrack from './update-track';
import { getTracks, getAllServers, runCommand } from '../api/NFD_api';



class DetailServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server: this.props.servers.filter(el => el.id === this.props.route.params.idServer)[0],
            isLoading: false,
        };
        this.tracks = [];
        this.username = this.props.userData.username;
        this.urlServer = this.props.userData.urlServer;
        this.token = this.props.userData.token;
        this.refreshing = false;
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
        } else {
            colorLight = '#9900ff';
        }
        return <View style={[serverDetailStyle.stateServerColor, {backgroundColor: colorLight}]}></View>
    }

    _onRefresh() {
        this.refreshing = true;
        getTracks(this.urlServer, this.username, this.token).then(tracksData => {

            this.tracks = tracksData.tracks;

            getAllServers(this.urlServer, this.username, this.token).then(serversData => {
                this.refreshing = false;
                this.setState({
                    ...this.state,
                    server: serversData.servers.filter(el => el.id === this.props.route.params.idServer)[0]
                });
                const action1 = {type: 'GET_SERVERS', value: serversData.servers};
                this.props.dispatch(action1);
            });
            const action2 = {type: 'GET_TRACKS', value: this.tracks};
            this.props.dispatch(action2);
        });
    }

    _toogleServerStatus() {
        const action = {type: 'RUN_CMD_SERVER', value: this.state.server};
        this.props.dispatch(action);
    }

    _runCommandServer(cmd) {
        this.setState({...this.state, isLoading: true});
        runCommand(this.urlServer, this.username, this.token, this.state.server.id, cmd).then(data => {
            let status;
            if (data.res === 'run') {
                status = 'running';
            } else if (data.res === 'kill') {
                status = 'stopping';
            } else {
                status = 'error';
            }
            this.setState({
                ...this.state,
                isLoading: false,
                server: {
                    id: this.state.server.id,
                    name: this.state.server.name,
                    status: status,
                    track: this.state.server.track
                }
            });
            this._toogleServerStatus();
        });
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={[serverDetailStyle.borderAndColorBloc, serverDetailStyle.actionServer]}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        } else {
            return (
                <View style={[serverDetailStyle.borderAndColorBloc, serverDetailStyle.actionServer]}>
                    <TouchableOpacity 
                        style={[serverDetailStyle.buttonAction, {backgroundColor: '#16a0b6', borderWidth: 3, borderColor: '#148c9f'}]}
                        onPress={() => this._runCommandServer('status')}
                    >
                        <MaterialCommunityIcons name="information-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[serverDetailStyle.buttonAction, {backgroundColor: '#28a745', borderWidth: 3, borderColor: '#23903c'}]}
                        onPress={() => this._runCommandServer('start')}
                    >
                        <MaterialCommunityIcons name="play-speed" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[serverDetailStyle.buttonAction, {backgroundColor: '#ffc107', borderWidth: 3, borderColor: '#e6ac00'}]}
                        onPress={() => this._runCommandServer('restart')}
                    >
                        <MaterialCommunityIcons name="restart" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[serverDetailStyle.buttonAction, {backgroundColor: '#dc3545', borderWidth: 3, borderColor: '#c32232'}]}
                        onPress={() => this._runCommandServer('stop')}
                    >
                        <MaterialCommunityIcons name="stop-circle-outline" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={serverDetailStyle.container}>
                <ScrollView contentContainerStyle={{flex: 1}} refreshControl={
                    <RefreshControl refreshing={this.refreshing} onRefresh={this._onRefresh.bind(this)}/>
                }>
                    <KeyboardAwareScrollView>
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
                        <UpdateTrack updateTracks={this.tracks} server={this.state.server}/>
                        {this._displayLoading()}
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData,
        tracks: state.tracks,
    };
}


export default connect(mapStateToProps)(DetailServer);