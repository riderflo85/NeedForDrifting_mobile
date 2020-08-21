import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { loginStyle } from '../static/styles';


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={loginStyle.main}>
                <View style={loginStyle.inputBox}>
                    <Text>Nom d'utilisateur</Text>
                    <TextInput style={loginStyle.inputArea}/>
                    <Text>Mot de passe</Text>
                    <TextInput style={loginStyle.inputArea} autoCapitalize='none' secureTextEntry={true} textContentType='password'/>
                    <Text>Clé API</Text>
                    <TextInput style={loginStyle.inputArea} autoCapitalize='none'/>
                </View>
            </View>
        );
    }
}

export default Login;