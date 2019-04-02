import React, { Component } from 'react';
import axios from 'axios';
import ToDoList from './ToDoList';
import Navbar from './navbar/navbar';
import moment from 'moment';
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
        let lastLogin = 0;
        if(localStorage.getItem('lastLogin') != null){
            const start = moment(new Date());
            const end = moment(localStorage.getItem('lastLogin'));
            const hours = moment.duration(start.diff(end)).asHours();
            lastLogin = hours;
           
        }
        if(localStorage.getItem('user')== null || localStorage.getItem('lastLogin') == null || lastLogin == 0 || lastLogin > 0.5){
            (async () => {
                const rawData = await fetch('/api/auth/getUser', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await rawData.json();
                if(result.username != undefined){
                    let addPlayerURL = '/api/users/addUser?name=' + result.username;
                    const resulting = await fetch(addPlayerURL, {
                        method: 'GET'
                    });
                    localStorage.setItem('user', result.username);
                    localStorage.setItem('lastLogin', moment().format());
                }
                else{
                    this.props.history.push('/');
                }
                
                this.setState(this.renderRedirect = () => {
                    //Checking that user exists
                    //True:     redirect to Home
                    //False:    redirect to CreateUser
                    if(true){
                        return ( <ToDoList showAlert={true} history={this.props.history}/> )
                    }
                });
                return result.username;
            })();
        }
        else{
            localStorage.setItem('showAlert', false);
            this.setState(this.renderRedirect = () => {
                //Checking that user exists
                //True:     redirect to Home
                //False:    redirect to CreateUser
                if(localStorage.getItem('user') != undefined){
                    let addPlayerURL = '/api/users/addUser?name=' + localStorage.getItem('user');
                    const resulting = fetch(addPlayerURL, {
                        method: 'GET'
                    });
                }
                if(true){
                    return ( <ToDoList showAlert={false} history={this.props.history}/> )
                }
            });
            return localStorage.getItem('user');
        }
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