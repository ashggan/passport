import axios from 'axios';
import {AUTH_SIGN_UP, AUTH_SIGN_OUT , AUTH_ERROR ,AUTH_SIGN_IN ,DASHBOARD_DATA } from './types';
/**
 * 
 * ActionCreater -> create/return ({}) -> dispatched -> middlewares -> reducers 
 * 
 */
 

// facebook action
export const FacebookOauth = data => {
    return async desipatched => {
        try {
            const res = await axios.post('http://localhost:5000/users/facebook/oauth',{
                access_token : data
            });
            
            desipatched ({
                type : AUTH_SIGN_UP,
                payload :res.data.token
            });

            localStorage.setItem('JWT_TOKEN',res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token; 
            
         } catch (error) {
            console.log( error);
         }
    }
}


 // google action 
 export const googleOauth = data => {
     return async desipatched => {
         try {
            const res = await axios.post('http://localhost:5000/users/google/oauth',{
                access_token : data
            });
            
            desipatched ({
                type : AUTH_SIGN_UP,
                payload :res.data.token
            });

            localStorage.setItem('JWT_TOKEN',res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token; 
        

         } catch (error) {
            console.log( error);
         }   

     }
 }


// get secert resource 
export const GetSecert= () => {
    return async desipatched => {
 
        const res  = await axios.get('http://localhost:5000/users/secret');
        desipatched({
            type :DASHBOARD_DATA,
            payload : res.data.name
        })
        console.log('secret : ', res);

    }
}


//  action creator for Sign Up 
export const SignUP = data => {
    return async desipatched => {
        // use the data to make http request to the backend 
        try {

            const res = await  axios.post('http://localhost:5000/users/signup',data);      

        // get the value of the token from the request response    
            desipatched({
                type: AUTH_SIGN_UP,
                payload :res.data.token
            }); 

        // store the value of the token locally
            localStorage.setItem('JWT_TOKEN',res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token; 
            


        } catch (error) {
            desipatched({
                type : AUTH_ERROR,
                payload :'Email is already existed'
            })
        }

    }
}

// 
//   action for  sign in 
export const SignIn = (data) => {
    return async desipatched => {
        try {
        const res = await  axios.post('http://localhost:5000/users/signin',data);   
        
        desipatched ({
            type: AUTH_SIGN_IN,
            payload :res.data.token 
        })
        
        localStorage.setItem('JWT_TOKEN',res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token; 

        } catch (error) {
            desipatched({
                type : AUTH_ERROR,
                payload :'not right'
            })
        }
        
    }
}


// action for sign out
export const SignOut = () => {
    return desipatched =>{
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '' ;
        
        desipatched({
            type: AUTH_SIGN_OUT,
            payload:''
        })
    }
}


 