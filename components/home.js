import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Login from './login';
import BottomNavigation from '../navigation/navigation';
import { authenticateUser } from '../api/NFD_api';
import { loginStyle } from '../static/styles';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            errorLogin: false,
            isLoading: false,
        };

    }

    _loginUser(username, pwd, token) {
        /*
        Fait une requete à l'API NFD afin de vérifier les informations de connexion du formulaire.
        */

        this.setState({isLoading: true});
        let newUserData = this.state.userData;
        authenticateUser(this.state.userData.urlServer, username, pwd, token).then(data => {
            if (!data.error) {
                this._storeUserInformations(username, pwd, token);
                newUserData.isLogin = true;
                this.setState({
                    userData: newUserData,
                    errorLogin: false
                });
            } else {
                this.setState({
                    userData: newUserData,
                    errorLogin: true,
                });
            }
            this.setState({isLoading: false});
        })
    }

    _storeUserInformations(username, pwd, token) {
        /*
        Stocke les informations de l'utilisateur dans le store Redux.
        */

        const action = {
            type: 'SAVE_USER_DATA',
            value: {
                username: username,
                password: pwd,
                token: token,
                login: true,
            }
        };
        this.props.dispatch(action);
    }

    _checkAuthenticate() {
        /*
        Vérifie si l'utilisateur est connecté ou non.
        Si oui, affiche la page d'accueil de l'app,
        si non, affiche la page de connexion
        */

        if (this.state.isLoading) {
            return (
                <View style={loginStyle.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        } else {
            if (this.state.userData.isLogin) {
                return (<BottomNavigation/>);
            } else {
                return (
                    <Login
                        sendLogin={this._loginUser.bind(this)}
                        errorLogin={this.state.errorLogin}
                    />
                );
            }
        }
    }

    render() {
        return (
            this._checkAuthenticate()
        );
    }
}

const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData,
    };
}

export default connect(mapStateToProps)(Home);