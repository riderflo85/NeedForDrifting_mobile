import { StyleSheet } from 'react-native';


const test = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
export default test;


export const loginStyle = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'rgb(228,228,228)'
        // alignItems: "center",
        // justifyContent: "center",
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
        // width: '50%',
        justifyContent: "center",
        marginTop: 50,
        backgroundColor: 'white',
        paddingBottom: 15,
        paddingHorizontal: 40,
        borderTopStartRadius: 35,
        borderTopEndRadius: 35
    },
    welcome: {
        marginTop: 15,
        marginBottom: 30,
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
        marginBottom: 20,
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
});