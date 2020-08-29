import React from 'react';
import { View, Text, Picker, Modal, Alert, Button } from 'react-native';
// import { Picker } from '@react-native-community/picker';


class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: 'Test',
            visible: false
        }


    }



    render() {
        return (
            <View>
                <Modal animationType="slide" transparent={true} visible={this.state.visible} onRequestClose={() => Alert.alert('Modal closed')}>
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
                                <Button title="Valider"/>
                                <Button title="Annuler" color='red' onPress={() => this.setState({visible: false})}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Button onPress={() => this.setState({visible: true})} title="Voir la modal"/>
            </View>
        );
    }

}


export default UserSettings;