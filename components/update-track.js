import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Picker, Modal, Platform, Button, Alert } from 'react-native';
import { serverDetailStyle, loginStyle, trackStyle } from '../static/styles';
import { changeTrack } from '../api/NFD_api';


class UpdateTrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: this.props.tracks,
            trackSelected: '',
            visible: false
        }
        this.configNewTrack = {input: undefined, value: ''};
        this.maxClients = {input: undefined, value: ''};
    }

    _trackSelector(tracks) {
        let allTracks;
        if (tracks.length === 0) {
            allTracks = this.state.tracks;
        } else {
            allTracks = tracks;
            if (tracks.length !== this.state.tracks.length) {
                this.setState({...this.state, tracks: allTracks});
            }
        }
        let pickerItem = allTracks.map((val, index) => {
            return (
                <Picker.Item label={val.name} value={val.folder_name} key={index}/>
            );
        });

        return pickerItem;
    }

    _trackSelected(value, index) {
        if (value !== 'null') {
            let newIndex = Platform.OS === 'ios' ? index : index - 1;
            this.setState({
                trackSelected: {
                    id: this.state.tracks[newIndex].id,
                    folder_name: value,
                    name: this.state.tracks[newIndex].name,
                }
            });
        }
    }

    _iosDisplayTrackSelected() {
        if (Platform.OS === 'ios') {
            return <Text style={{color: 'black'}}>{this.state.trackSelected.name}</Text>;
        }
    }

    _displayAlert() {
        let user = this.props.userData;

        Alert.alert(
            'Information',
            'Le changement de la piste ne redémarre pas le serveur !!!',
            [
                {
                    text: "OK"
                }
            ],
            { cancelable: false }
        );
        changeTrack(
            user.urlServer,
            user.username,
            user.token,
            this.props.server.id,
            this.state.trackSelected.id,
            this.configNewTrack.value,
            this.maxClients.value
        ).then(data => {
            if (data.state) {
                this.configNewTrack.input.clear();
                this.maxClients.input.clear();
                this.setState({trackSelected: ''});
            }
        });
    }

    _displayPicker(tracks) {
        if (Platform.OS === 'ios') {
            return (
                <View style={trackStyle.iosButtonChoice}>
                    <Modal animationType="fade" transparent={true} visible={this.state.visible} onRequestClose={() => Alert.alert('Modal closed')}>
                        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(77, 77, 77, 0.7)'}}>
                            <View style={{backgroundColor: 'rgb(255, 255, 255)', borderRadius: 20}}>
                                <View style={{height: 50}}>
                                    <Picker
                                        selectedValue={this.state.trackSelected.folder_name}
                                        style={{height: 50, width: '100%'}}
                                        onValueChange={this._trackSelected.bind(this)}
                                    >
                                        {this._trackSelector(tracks)}
                                    </Picker>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '40%', marginBottom: '5%'}}>
                                    <Button title="Annuler" color='red' onPress={() => this.setState({visible: false, trackSelected: ''})}/>
                                    <Button title="Valider" onPress={() => this.setState({visible: false})}/>
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
                    selectedValue={this.state.trackSelected.folder_name}
                    style={{height: 50, width: '100%', marginVertical: 10}}
                    onValueChange={this._trackSelected.bind(this)}
                >
                    <Picker.Item label="Choisissez une piste" value="null"/>
                    {this._trackSelector(tracks)}
                </Picker>
            );
        }
    }

    render() {
        const tracksUpdated = this.props.updateTracks;
        return (
            <View style={[serverDetailStyle.borderAndColorBloc, trackStyle.main]}>
                <Text style={trackStyle.titleBloc}>Changer la piste du serveur !</Text>
                <Text style={loginStyle.titleInput}><Text style={{color: '#dc3545'}}>*</Text>Nom de la piste : {this._iosDisplayTrackSelected()}</Text>
                {this._displayPicker(tracksUpdated)}
                <Text style={loginStyle.titleInput}>Configuration de la piste (Sous piste) :</Text>
                <TextInput
                    style={loginStyle.inputArea}
                    onChangeText={(text) => this.configNewTrack.value = text}
                    ref={input => {this.configNewTrack.input = input}}
                />
                <Text style={loginStyle.titleInput}><Text style={{color: '#dc3545'}}>*</Text>Client max (PitBox) :</Text>
                <TextInput
                    style={loginStyle.inputArea}
                    keyboardType="decimal-pad"
                    onChangeText={(text) => this.maxClients.value = text}
                    ref={input => {this.maxClients.input = input}}
                />
                <View style={trackStyle.footerBloc}>
                    <Text style={{alignSelf: 'flex-end', color: '#737373'}}><Text style={{color: '#dc3545'}}>*</Text>Champs obligatoires</Text>
                    <TouchableOpacity style={trackStyle.valideButton} onPress={this._displayAlert.bind(this)}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        servers: state.servers,
        userData: state.userData,
        tracks: state.tracks
    };
}

export default connect(mapStateToProps)(UpdateTrack);