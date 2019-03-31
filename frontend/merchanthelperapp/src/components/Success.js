import React, { Component } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser'
import {
    Switch,
    Route,
    Redirect
}              from 'react-router-dom';


class Success extends React.Component {
    constructor(props){
        super(props)
    };
    componentDidMount(){
        const code = new URLSearchParams(this.props.location.search);
        console.log('Code', code.get('code'));

        axios({
            baseURL: 'https://github.com/login/oauth/access_token',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: {
                client_id: '06e862791312dfd72480',
                client_secret: '4160078d4f864ec99533255daf1fc777fe5a4902',
                code: String(code).substr(5)
            }
        })
            .then( res => console.log(res.data))
            .catch(err => alert(err));
    };

    renderRedirect = () => {
        //Checking that user exists
        //True:     redirect to Home
        //False:    redirect to CreateUser
        if(true){
            return ( <CreateUser/> )
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        )
    }
}

export default Success;