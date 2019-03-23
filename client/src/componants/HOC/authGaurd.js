import React , { Component } from 'react';
import { connect } from 'react-redux';

export default (OrgComponent) => {
    class MixedComponent extends Component {
        
        checkAuth(){
            this.props.history.push('/');
            console.log('access forbiden');
        }

        componentDidMount(){
            if(!this.props.isAuth && !this.props.token) this.checkAuth();
                
                
            

        }
        componentDidUpdate(){
            if(!this.props.isAuth && !this.props.token) this.checkAuth(); 
        }


    render(){
        return(<OrgComponent {...this.props } />);
    }    
    };

    function mapPropsToState(state){
        return {
            isAuth : state.auth.isAuthenicated,
            token : state.auth.token
        }
    }

    return connect(mapPropsToState)(MixedComponent);
} 



