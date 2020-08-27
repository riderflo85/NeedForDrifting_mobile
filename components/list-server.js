import React from 'react';
import { View, Text, StatusBar, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { listServersStyle } from '../static/styles';
import { getAllServers } from '../api/NFD_api';
import ServerItem from './server-item';


class ListServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: [],
        };
        this.token = this.props.userData.token; 
        this.username = this.props.userData.username; 
        this.urlServer = this.props.userData.urlServer; 
    }

    _getServers() {
        if (this.urlServer !== "") {
            getAllServers(this.urlServer, this.username, this.token).then(data => {
                this.setState({servers: data.servers});
                if (this.props.servers.length === 0) {
                    // console.log('test');
                    // console.log(this.state.servers);
                    const action = {type: 'GET_SERVERS', value: this.state.servers}
                    this.props.dispatch(action);
                }
            })
        }
        
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
                        data={this.state.servers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ServerItem
                                server={item}
                                displayServerDetail={this._displayServerDetail}
                            />
                        )}
                    />
                </View>
            );

        } else {
            this._getServers();
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
    };
}


export default connect(mapStateToProps)(ListServer);