import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';


class DetailServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server: undefined
        };
    }

    componentDidMount() {
        this.setState({
            server: this.props.servers.filter(el => el.id === this.props.route.params.idServer)
        }, () => {this._updateNavigationTitle()});
    }

    _updateNavigationTitle() {
        this.props.navigation.setOptions({title: this.state.server[0].name})
    }

    render() {        
        return (
            <View>

            </View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        servers: state.servers
    };
}


export default connect(mapStateToProps)(DetailServer);