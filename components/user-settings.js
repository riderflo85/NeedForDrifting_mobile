import React from 'react';
import { View, Text, TextInput, Alert, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { serverDetailStyle, settings } from '../static/styles';


class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnValideUsername: false,
            btnValideUrl: false,
            btnValideToken: false,
        }
        this.usernameInput = '';
        this.urlInput = '';
        this.tokenInput = '';
    }

    _editData(dataType) {
        if (dataType === 'username') {
            this.setState({...this.state, btnValideUsername: true});

        } else if (dataType === 'urlServer') {
            this.setState({...this.state, btnValideUrl: true});

        } else if (dataType === 'token') {
            this.setState({...this.state, btnValideToken: true});
        }
    }

    _valideData(dataType) {
        let action = {
            type: 'UPDATE_USER_DATA',
            value: {
                username: this.props.userData.username,
                token: this.props.userData.token,
                urlServer: this.props.userData.urlServer
            }
        };

        if (dataType === 'username') {
            action.value.username = this.usernameInput;
            this.setState({...this.state, btnValideUsername: false});
            
        } else if (dataType === 'urlServer') {
            action.value.urlServer = this.urlInput;
            this.setState({...this.state, btnValideUrl: false});
            
        } else if (dataType === 'token') {
            action.value.token = this.tokenInput;
            this.setState({...this.state, btnValideToken: false});
        }
        this.props.dispatch(action);
    }

    _cancelData(dataType) {
        if (dataType === 'username') {
            this.usernameInput = '';
            this.setState({...this.state, btnValideUsername: false});

        } else if (dataType === 'urlServer') {
            this.urlInput = '';
            this.setState({...this.state, btnValideUrl: false});

        } else if (dataType === 'token') {
            this.tokenInput = '';
            this.setState({...this.state, btnValideToken: false});
        }
    }

    _displayValideNewData(dataType) {
        const iconCheck = <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={25} color="#23903c"/>;
        const iconClose = <MaterialCommunityIcons name="close-circle-outline" size={25} color="#c32232"/>;
        const iconEdit = <MaterialCommunityIcons name="square-edit-outline" size={25} color="#0d96d1"/>;
        
        if (dataType === 'username') {
            const styles = [settings.section, {marginBottom: 10}];
            const icon = <MaterialCommunityIcons name="account" size={25} color="grey"/>;

            if (this.state.btnValideUsername) {
                return (
                    <View style={styles}>
                        {icon}
                        <TextInput
                            style={settings.input}
                            placeholder="Saisissez votre nom d'utilisateur"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={24}
                            onChangeText={(text) => {this.usernameInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this._cancelData('username')}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => this._valideData('username')}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles}>
                        {icon}
                        <Text>{this.props.userData.username}</Text>
                        <TouchableOpacity onPress={() => this._editData('username')}>
                            {iconEdit}
                        </TouchableOpacity>
                    </View>
                );
            }

        } else if (dataType === 'urlServer') {
            const styles = [settings.section, {paddingVertical: 10}, settings.separator];
            const icon = <MaterialCommunityIcons name="server" size={25} color="grey"/>;

            if (this.state.btnValideUrl) {
                return (
                    <View style={styles}>
                        {icon}
                        <TextInput
                            style={settings.input}
                            placeholder="Saisissez l'url de votre serveur"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={150}
                            onChangeText={(text) => {this.urlInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this._cancelData('urlServer')}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => this._valideData('urlServer')}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles}>
                        {icon}
                        <Text>{this.props.userData.urlServer}</Text>
                        <TouchableOpacity onPress={() => this._editData('urlServer')}>
                            {iconEdit}
                        </TouchableOpacity>

                    </View>
                );
            }

        } else if (dataType === 'token') {
            const icon = <MaterialCommunityIcons name="key-variant" size={25} color="grey"/>;
            const styles = [settings.section, {marginTop: 10}];

            if (this.state.btnValideToken) {
                return (
                    <View style={styles}>
                        {icon}
                        <TextInput
                            style={settings.input}
                            placeholder="Saisissez votre nouvelle clé API"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={24}
                            onChangeText={(text) => {this.tokenInput = text}}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this._cancelData('token')}>
                                {iconClose}
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 5}} onPress={() => this._valideData('token')}>
                                {iconCheck}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles}>
                        {icon}
                        <Text>{this.props.userData.token}</Text>
                        <TouchableOpacity onPress={() => this._editData('token')}>
                            {iconEdit}
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    render() {
        return (
            <View style={[serverDetailStyle.container, settings.main]}>
                <View style={[serverDetailStyle.borderAndColorBloc, serverDetailStyle.dataServer]}>
                    {this._displayValideNewData('username')}
                    {this._displayValideNewData('urlServer')}
                    {this._displayValideNewData('token')}
                </View>
                <View style={{marginBottom: 25}}>
                    <Button title="Déconnexion" color="#c32232"/>
                </View>
            </View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
}


export default connect(mapStateToProps)(UserSettings);