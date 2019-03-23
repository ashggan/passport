import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth';
import DashboardReducer from './dashboard'; 

export default combineReducers ({
    form  : formReducer,
    auth : AuthReducer,
    dash : DashboardReducer
});

