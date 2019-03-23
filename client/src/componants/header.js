import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../actions';

 class  Header extends Component {
    constructor(props){
        super(props); 
        this.signingout = this.signingout.bind(this);
        }
    signingout(){
        this.props.SignOut();
        console.log('we are signing out')
    }
    render() {
        
        return(   
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"   >Oauth App</Link>
                <button className="navbar-toggler" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link  className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
                    </li>
                    
                    
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    { !this.props.isAuth ? 
                        [ <li className="nav-item "> <Link  className="nav-link" to="/Signup" key="signup">SIGN UP</Link> </li>,
                        <li className="nav-item "> <Link  className="nav-link" to="/Signin" key="signin">SIGN IN</Link> </li>]
                            :  null } 

                        { this.props.isAuth ?                         
                        <li className="nav-item "> <Link onClick={this.signingout}  className="nav-link" to="/">SIGN OUT</Link> </li> 
                        : null }
                         
                        


                    </ul>
                     
                
                </div>
            </nav>
        );
         
    }
}

function mapStateToProps(state){
    return {
        isAuth : state.auth.isAuthenicated
    }
}
export default connect(mapStateToProps,actions)(Header)