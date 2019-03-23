import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route } from 'react-router-dom';
import { createStore , applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
 
import App from './componants/app';
import * as serviceWorker from './serviceWorker';
import Home from './componants/home';
import SignIn from './componants/signin';
import SignUp from './componants/signup';
import Dashboard from './componants/dashboard';
import reducers from './reducers/index';
import AuthGuard from './componants/HOC/authGaurd';

const  JWT_TOKEN  = localStorage.getItem('JWT_TOKEN');



ReactDOM.render(
    <Provider store={createStore(reducers,{
        auth :{
            token : JWT_TOKEN ,
            isAuthenicated : JWT_TOKEN ? true : false 
        }
    },applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Route exact  path="/"component={Home}/> 
                <Route exact  path="/Signin" component={SignIn}/> 
                <Route exact  path="/Signup" component={SignUp}/>   
                <Route exact  path="/dashboard" component={AuthGuard(Dashboard)}/>   
            </App> 
        </BrowserRouter>
    </Provider>
    
, document.getElementById('root'));
serviceWorker.unregister();
