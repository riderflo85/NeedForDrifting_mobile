const initialState = {
    servers: []
};

function manageServer(state=initialState, action) {
    let nextState;

    switch (action.type) {
        case 'RUN_SERVER':
            // run the server
            console.log('dans le reducer');
            nextState = {
                ...state,
                servers: action.value
            };
            console.log(nextState);
            return nextState || state // renvoi nextState si celui-ci est différent de undefined
    
        default:
            return state;
    }
}

export default manageServer;