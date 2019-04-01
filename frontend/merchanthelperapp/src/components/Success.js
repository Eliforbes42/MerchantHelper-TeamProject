import React, { Component } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser'
import ToDoList from './ToDoList'
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
        const url = 'https://github.com/login/oauth/access_token';
        const data = {
                client_id: '06e862791312dfd72480',
                client_secret: '4160078d4f864ec99533255daf1fc777fe5a4902',
                code: String(code).substr(5)
            }

        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     mode: 'cors'
        // }).then(res => res.json())
        //     .then( response => console.log(JSON.stringify(response)))
        //     .catch(err => alert(err));
        
        axios({
            url: 'https://github.com/login/oauth/access_token',
            method: 'POST',
            headers: {'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json'
            },
            body:{
                client_id: '06e862791312dfd72480',
                client_secret: '4160078d4f864ec99533255daf1fc777fe5a4902',
                code: String(code).substr(5)
            }
        })
            .then( res => console.log(res.data))
            .catch(err => console.log(err));
    };

    renderRedirect = () => {
        //Checking that user exists
        //True:     redirect to Home
        //False:    redirect to CreateUser
        if(true){
            return ( <ToDoList/> )
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