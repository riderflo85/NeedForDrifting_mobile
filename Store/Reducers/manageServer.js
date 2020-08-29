const initialState = {
    servers: [],
    userData: {
        username: 'admin',
        password: '',
        // token: '',
        token: 'Ihzt3xi5R5jqCMgVVi9UMwmi',
        urlServer: 'http://192.168.1.19:8000',
        // urlServer: '',
        // urlServer: 'http://172.20.10.13:8000',
        isLogin: true,
    },
};

function manageServer(state=initialState, action) {
    let nextState;

    switch (action.type) {
        case 'GET_SERVERS':
            nextState = {
                ...state,
                servers: action.value
            };
            return nextState || state // renvoi nextState si celui-ci est différent de undefined

        case 'SAVE_USER_DATA':
            nextState = state
            nextState.userData.username = action.value.username;
            nextState.userData.password = action.value.password;
            nextState.userData.token = action.value.token;
            nextState.userData.isLogin = action.value.login;

            return nextState || state

        default:
            return state;
    }
}

export default manageServer;