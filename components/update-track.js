import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Picker, Modal, Platform, Button } from 'react-native';
import { serverDetailStyle, loginStyle, trackStyle } from '../static/styles';


class UpdateTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: 'Tsukuba',
            visible: false
        }
    }

    _displayPicker() {
        if (Platform.OS === 'ios') {
            return (
                <View style={trackStyle.iosButtonChoice}>
                    <Modal animationType="fade" transparent={true} visible={this.state.visible} onRequestClose={() => Alert.alert('Modal closed')}>
                        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(77, 77, 77, 0.7)'}}>
                            <View style={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: 20}}>
                                <View style={{height: 50}}>
                                    <Picker
                                        selectedValue={'trackTree'}
                                        style={{height: 50, width: '100%'}}
                                    >
                                        <Picker.Item label="Piste O1" value="trackOne"/>
                                        <Picker.Item label="Piste O2" value="trackTwo"/>
                                        <Picker.Item label="Piste O3" value="trackTree"/>
                                        <Picker.Item label="Piste O4" value="trackFour"/>
                                        <Picker.Item label="Piste O5" value="trackFive"/>
                                    </Picker>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '40%', marginBottom: '5%'}}>
                                    <Button title="Annuler" color='red' onPress={() => this.setState({visible: false})}/>
                                    <Button title="Valider"/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Button onPress={() => this.setState({visible: true})} title="Choisir une piste"/>
                </View>
            );
        } else {
            return (
                <Picker
                    selectedValue={'trackTree'}
                    style={{height: 50, width: '100%', marginVertical: 10}}
                >
                    <Picker.Item label="Piste O1" value="trackOne"/>
                    <Picker.Item label="Piste O2" value="trackTwo"/>
                    <Picker.Item label="Piste O3" value="trackTree"/>
                    <Picker.Item label="Piste O4" value="trackFour"/>
                    <Picker.Item label="Piste O5" value="trackFive"/>
                </Picker>
            );
        }
    }

    render() {
        return (
            <View style={[serverDetailStyle.borderAndColorBloc, trackStyle.main]}>
                <Text style={trackStyle.titleBloc}>Changer la piste du serveur !</Text>
                <Text style={loginStyle.titleInput}>Nom de la piste :</Text>
                {this._displayPicker()}
                <Text style={loginStyle.titleInput}>Configuration de la piste (Sous piste) :</Text>
                <TextInput style={loginStyle.inputArea}/>
                <Text style={loginStyle.titleInput}>Client max (PitBox) :</Text>
                <TextInput style={loginStyle.inputArea} keyboardType="decimal-pad"/>
                <TouchableOpacity style={trackStyle.valideButton}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Valider</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData
    };
}

export default connect(mapStateToProps)(UpdateTrack);