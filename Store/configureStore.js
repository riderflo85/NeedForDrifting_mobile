import { createStore} from 'redux';
import manageServer from './Reducers/manageServer';


export default createStore(manageServer);