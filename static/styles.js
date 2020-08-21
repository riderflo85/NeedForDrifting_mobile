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
        alignItems: "center",
        justifyContent: "center",
    },
    inputBox: {
        width: '50%',
    },
    inputArea: {
        width: '100%',
        padding: 5,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderColor: 'grey'
    }
});