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

    renderRedirect = () => {
        
    }

    componentDidMount(){
        const code = new URLSearchParams(this.props.location.search);
        console.log('Code', code.get('code'));
        const url = 'https://github.com/login/oauth/access_token';
        const data = {
                code: String(code).substr(5)
            };
        (async () => {
            const rawData = await fetch('/api/auth/getUser', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await rawData.json();

            console.log(result);
            localStorage.setItem('user', result.username);
            
            this.setState(this.renderRedirect = () => {
                //Checking that user exists
                //True:     redirect to Home
                //False:    redirect to CreateUser
                if(true){
                    return ( <ToDoList/> )
                }
            });
            return result.username;
        })();
    };

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/api/index');
        const body = await response.json();

        if (response.status !== 200) {
        throw Error(body.message) 
        }
        return body;
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        )
    }
}

export default Success;