import React from 'react';
import { View, TextInput, Text, Image, Switch, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { loginStyle, loginStyleError } from '../static/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            stayConnected: true,
        };
        this.username = '';
        this.password = '';
        this.api = '';
    }

    _usernameInput(text) {
        this.username = text;
    }

    _pwdInput(text) {
        this.password = text;
    }

    _apiInput(text) {
        this.api = text;
    }

    _userStayConnected = (value) => {
        this.setState({
            stayConnected: value
        });
    }

    _ifLoginError() {
        if (!this.props.errorLogin) {
            return (
                <Text style={loginStyle.welcome}>Bienvenue !</Text>
            );
        } else {
            return (
                <Text style={loginStyleError.welcome}>Les informations renseignées sont incorrects, merci de corriger cela !</Text>
            );
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={loginStyle.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={loginStyle.main}>
                <View style={loginStyle.boxLogo}>
                    <Image style={loginStyle.logo} source={require('../static/images/logo.png')}/>
                    <Image style={loginStyle.logoP2} source={require('../static/images/logo_part2-2.png')}/>
                </View>
                <View style={loginStyle.inputBox}>
                    <KeyboardAwareScrollView>
                        <View>
                            {this._ifLoginError()}
                            <Text style={loginStyle.titleInput} >Nom d'utilisateur</Text>
                            <TextInput style={loginStyle.inputArea} onChangeText={(text) => this._usernameInput(text)}/>
                            <Text style={loginStyle.titleInput} >Mot de passe</Text>
                            <TextInput
                                style={loginStyle.inputArea}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={(text) => this._pwdInput(text)}
                            />
                            <Text style={loginStyle.titleInput} >Clé API</Text>
                            <TextInput
                                style={loginStyle.inputArea}
                                autoCapitalize='none'
                                onChangeText={(text) => this._apiInput(text)}
                            />
                            <View style={loginStyle.stayConnected}>
                                <Text>Rester connecté ? </Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#0d96d1" }}
                                    thumbColor={Platform.OS === 'ios' ? 'white' : this.state.stayConnected ? "rgb(228,228,228)" : "#f4f3f4"}
                                    onValueChange={this._userStayConnected}
                                    value={this.state.stayConnected}
                                />
                            </View>
                            <TouchableOpacity
                                style={loginStyle.buttonLogin}
                                onPress={() => this.props.sendLogin(this.username, this.password, this.api)}
                            >
                                <View style={loginStyle.blocButtonLogin}>
                                    <Text style={loginStyle.textButtonLogin}>CONNEXION</Text>
                                    <MaterialCommunityIcons
                                        name="arrow-right-drop-circle-outline"
                                        size={25}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                {this._displayLoading()}
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


export default connect(mapStateToProps)(Login);