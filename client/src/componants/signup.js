import React , { Component } from 'react';
import  { reduxForm , Field }  from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import CustomeInput from './customeInput';
import * as actions from './../actions';


class SignUp extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);  
        this.googelResponse = this.googelResponse.bind(this);  
        this.facebookResponse = this.facebookResponse.bind(this);  
        
    }

    async googelResponse(res){
        await this.props.googleOauth(res.accessToken);
        if(!this.props.errors){
            this.props.history.push('/dashboard');
        }

    }
    
    async facebookResponse(res){
        console.log('calling facebook');
        await this.props.FacebookOauth(res.accessToken);
        if(!this.props.errors){
            this.props.history.push('/dashboard');
        }
    }

    async onSubmit (data){
        // csll to the dispatcher 
        await this.props.SignUP(data);
        if(!this.props.errors){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row mt-5">
            
                <div className="col-md-10 offset-md-1">

                { this.props.errorMsg ? 
                <div className="alert alert-danger">
                {this.props.errorMsg }</div>
                :null }

                <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field 
                            name = "name"
                            type="text"
                            id="name"
                            label = "Enter your name Please"
                            component={CustomeInput}
                            />
                        </fieldset>
                        <fieldset>
                            <Field 
                            name = "email"
                            type="text"
                            id="email"
                            label = "Enter your email Please"
                            component={CustomeInput}
                            />
                        </fieldset>
                        <fieldset>
                            <Field 
                            name = "password"
                            type="password"
                            id="password"
                            label = "Enter your password Please"
                            component={CustomeInput}
                            />
                        </fieldset>
                        <button type="submit" className="btn btn-block btn-dark">SIGN UP</button>
                    </form>
                </div>
                <div className="col-md-10 offset-md-1 mt-3">
                    <p className="text-center"> OR USE </p>
                </div>
                <div className="col-md-10 offset-md-1 mt-3">
                <FacebookLogin
                appId="263859914544431"
                textButton="FACEBOOK"
                fields= "name,email,picture"
                cssClass="btn btn-outline-dark btn-block mt-2 mb-2"
                callback={this.facebookResponse}
                />
                <GoogleLogin 
                    clientId="543614810862-vabuaqcdac8dj414mhcerse4gsmk4fg0.apps.googleusercontent.com"
                    buttonText="GOOGLE"
                    onSuccess={this.googelResponse}
                    onFailure={this.googelResponse}
                    cssClass="btn btn-outline-dark btn-danger mt-2"
                />
                    {/* <button className="btn btn-outline-dark btn-block " >GOOGLE  </button> */}
                    {/* <button className="btn btn-outline-dark btn-block" > </button> */}
                </div>
            </div>
                
        
        )
    }
};


function mapStateToProp(state){
    return {
        errorMsg : state.auth.errors
    }  
}

export default compose(
    connect(mapStateToProp,actions),
    reduxForm({form: 'signup'})
)(SignUp)
 
