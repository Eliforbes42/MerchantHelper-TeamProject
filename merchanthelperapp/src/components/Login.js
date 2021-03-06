import React from 'react';
import { Alert, Card, Button, Col, Row } from 'react-bootstrap';
import moment from 'moment';

class Login extends React.Component {
    constructor(props){
        super(props)
    };

    componentDidMount(){
        let lastLogin = 1;
        if(localStorage.getItem('lastLogin') != null){
            const start = moment(new Date());
            const end = moment(localStorage.getItem('lastLogin'));
            const hours = moment.duration(start.diff(end)).asHours();
            this.lastLogin = hours;
        }
        if(localStorage.getItem('user') != undefined && localStorage.getItem('user') != null && this.lastLogin < 0.5){
            this.props.history.push('/login/success');
        }
    }

    loginHandler(evt){
        console.log('Clicked Login', evt);
    }

    loginCard = () => {
        return (
            <center>
                <div style={{height: '5rem'}} />
                <Card bg="dark" style={{ width: '22rem',  "box-shadow":'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <Card.Img variant="top" src="https://www.idgcdn.com.au/article/images/740x500/dimg/sea-of-thieves-4.jpg" />
                <Card.Body>
                    {this.githubButton()}
                </Card.Body>
                </Card>
            </center>
        );
    }

    githubButton = () => {
        return (<a href='https://github.com/login/oauth/authorize?scope=user:email&client_id=06e862791312dfd72480' className="btn btn-social btn-github">
                <span className="fa fa-github"></span> Sign in with Github
            </a>
            )
    }

    render() {
        return (
            <div style={{'background-color':'#ffeaa7'}}>
                <div style={{height: '5rem', color: 'white'}}/>
                <center><h1 style={{color: '#2d3436'}}>Merchant Helper for Sea of Thieves</h1></center>
                {this.loginCard()}
            </div>
        )
    }

}

export default Login;