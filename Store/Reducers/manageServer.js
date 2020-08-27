const initialState = {
    servers: [],
    userData: {
        username: 'admin',
        password: '',
        token: 'Ihzt3xi5R5jqCMgVVi9UMwmi',
        // urlServer: 'http://192.168.1.32:8000',
        // urlServer: '',
        urlServer: 'http://172.20.10.13:8000',
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
    
        default:
            return state;
    }
}

export default manageServer;