import { AUTH_SIGN_UP ,AUTH_ERROR ,AUTH_SIGN_OUT,AUTH_SIGN_IN } from './../actions/types';

const DEFAULT_STATE  = {
    isAuthenicated :false,
    token:'',
    errors:''
}

export default (state = DEFAULT_STATE,action) => {
    switch (action.type){

    case AUTH_SIGN_UP :
        return { ...state, token:action.payload , isAuthenicated : true , errors:'' }
    case AUTH_SIGN_IN :
        return { ...state, token:action.payload , isAuthenicated : true , errors:'' }
    case  AUTH_ERROR :
        return {...state , errors: action.payload}
    case AUTH_SIGN_OUT :
    return { ...state, token:action.payload , isAuthenicated : false , errors:'' }

    default :
       return state
    }
}