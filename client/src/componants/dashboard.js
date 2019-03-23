import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class Dashboard extends Component {
    async componentDidMount(){
        this.props.GetSecert();
    }
    render() {
        return (
            <div>
                this is dashboard <b>{ this.props.secret } </b>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        secret : state.dash.secret
    }
}
 
export default connect(mapStateToProps,actions)(Dashboard);