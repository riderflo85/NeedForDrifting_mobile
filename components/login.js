import React from 'react';
import { View, TextInput, Text, Image, Switch, TouchableOpacity } from 'react-native';
import { loginStyle } from '../static/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stayConnected: true
        }
    }

    _userStayConnected = (value) => {
        this.setState({
            stayConnected: value
        });
    }

    _loginUser() {
        console.log('user login');
    }

    render() {
        return (
            <View style={loginStyle.main}>
                <View style={loginStyle.boxLogo}>
                    <Image style={loginStyle.logo} source={require('../static/images/logo.png')}/>
                    <Image style={loginStyle.logoP2} source={require('../static/images/logo_part2-2.png')}/>
                </View>
                <View style={loginStyle.inputBox}>
                    <Text style={loginStyle.welcome}>Bienvenue !</Text>
                    <Text style={loginStyle.titleInput} >Nom d'utilisateur</Text>
                    <TextInput style={loginStyle.inputArea}/>
                    <Text style={loginStyle.titleInput} >Mot de passe</Text>
                    <TextInput
                        style={loginStyle.inputArea}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        textContentType='password'
                    />
                    <Text style={loginStyle.titleInput} >Clé API</Text>
                    <TextInput
                        style={loginStyle.inputArea}
                        autoCapitalize='none'
                    />
                    <View style={loginStyle.stayConnected}>
                        <Text>Rester connecté ? </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#0d96d1" }}
                            onValueChange={this._userStayConnected}
                            value={this.state.stayConnected}
                        />
                    </View>
                    <TouchableOpacity
                        style={loginStyle.buttonLogin}
                        onPress={this._loginUser}
                    >
                        <View style={loginStyle.blocButtonLogin}>
                            <Text style={loginStyle.textButtonLogin}>CONNEXION</Text>
                            <MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={25} color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }
}

export default Login;