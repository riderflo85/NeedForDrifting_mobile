import React from 'react';
import { View, Text, StatusBar, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { listServersStyle } from '../static/styles';
import { getAllServers, getTracks } from '../api/NFD_api';
import ServerItem from './server-item';


class ListServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: this.props.servers,
            tracks: [],
        };
        this.token = this.props.userData.token; 
        this.username = this.props.userData.username; 
        this.urlServer = this.props.userData.urlServer; 
    }


    _getServers() {
        if (this.urlServer !== "") {
            getAllServers(this.urlServer, this.username, this.token).then(data => {

                this.setState({
                    ...this.state,
                    servers: data.servers,
                });

                const action = {type: 'GET_SERVERS', value: this.state.servers}
                this.props.dispatch(action);
                // if (this.props.servers.length === 0) {
                // }
            }).catch(error => {
                console.log("error de serveur");
            });
        }
    }

    _getTracks() {
        getTracks(this.urlServer, this.username, this.token).then(data => {

            this.setState({
                ...this.state,
                tracks: data.tracks,
            });

            const action = {type: 'GET_TRACKS', value: this.state.tracks}
            this.props.dispatch(action);
        //     if (this.props.tracks.length === 0) {
        // }
        }).catch(error => {
            console.log('error de serveur');
        });
    }

    _displayServerDetail = (idServer) => {
        this.props.navigation.navigate('Detail server', {idServer: idServer});
    }

    _displayServers() {
        if (this.state.servers.length > 0) {
            
            return (
                <View style={listServersStyle.container}>
                    <Text style={listServersStyle.title}>Vos Serveurs !</Text>
                    <FlatList
                        style={listServersStyle.listingServerBloc}
                        data={this.props.servers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ServerItem
                                server={item}
                                displayServerDetail={this._displayServerDetail}
                                statusServ={item.status}
                            />
                        )}
                    />
                </View>
            );

        } else {
            this._getServers();
            this._getTracks();
            return (
                <View style={listServersStyle.noServerBloc}>
                    <Image source={require('../static/images/stickman_bad.png')}/>
                    <Text style={listServersStyle.notFoundText}>Aucun serveur Assetto n'a été trouvés !</Text>
                    <Text style={listServersStyle.textNoServerIndicateSettings}>Vérifier ou modifier l'url de votre serveur dans vos paramètres</Text>
                </View>
            );
        }
    }

    render() {
        console.log('list flat list render', this.props.servers);
        return (
            <View style={{flex: 1, backgroundColor: 'rgb(228,228,228)'}}>
                <StatusBar backgroundColor="#0d96d1" barStyle="light-content"/>
                {this._displayServers()}
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


export default connect(mapStateToProps)(ListServer);