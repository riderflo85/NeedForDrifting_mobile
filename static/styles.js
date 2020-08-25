import { StyleSheet, Platform } from 'react-native';


export const loginStyle = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'rgb(228,228,228)'
    },
    boxLogo: {
        flex: 0.6,
        alignItems: "center"
    },
    logo: {
        marginTop: 20,
        marginBottom: 20,
    },
    inputBox: {
        flex: 1,
        justifyContent: "center",
        marginTop: '10%',
        backgroundColor: 'white',
        paddingHorizontal: 50,
        borderTopStartRadius: 35,
        borderTopEndRadius: 35
    },
    welcome: {
        marginTop: '4%',
        marginBottom: '4%',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleInput: {
        color: '#737373',
    },
    inputArea: {
        width: '100%',
        padding: 5,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    stayConnected: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: Platform.OS === 'ios' ? '7%' : '3%',
    },
    buttonLogin: {
        alignSelf: 'center',
        width: '70%',
        backgroundColor: '#0d96d1',
        padding: 13,
        borderRadius: 30,
    },
    blocButtonLogin: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textButtonLogin: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: '500',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    }
});


export const loginStyleError = StyleSheet.create({
    welcome: {
        marginTop: '4%',
        marginBottom: '4%',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
});


export const listServersStyle = StyleSheet.create({
    noServerBloc: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    notFoundText: {
        marginVertical: 20,
    },
    textNoServerIndicateSettings: {
        flexWrap: 'wrap',
        width: '90%',
        textAlign: "center",
    },
    container: {
        marginTop: 40,
        marginHorizontal: 10,
    },
    listingServerBloc: {
        borderRadius: 20,
        backgroundColor: 'white',
    },
    title: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
});


export const detailServerStyle = StyleSheet.create({
    container: {
        height: 50,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    nameServer: {

    },
    stateServerBloc: {
        justifyContent: 'center'
    },
    stateServerColor: {
        width: 8,
        height: 20,
        position: "absolute",
        top: '9%',
        left: 11.2,
        zIndex: -10
    },
    rightArrow: {

    },
    separator: {
        height: 1,
        width: '100%',
        // marginLeft: '15%',
        backgroundColor: 'rgb(228,228,228)'
    },
});