import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props)
    };

    loginHandler(evt){
        console.log('click', evt);
    }

    render() {
        return (
            <div>
                <h1>Login page!</h1>
            <a href='https://github.com/login/oauth/authorize?scope=user:email&client_id=06e862791312dfd72480' className="btn btn-social btn-github">
                <span className="fa fa-github"></span> Sign in with Github
            </a>
            </div>
        )
    }

}

export default Login;