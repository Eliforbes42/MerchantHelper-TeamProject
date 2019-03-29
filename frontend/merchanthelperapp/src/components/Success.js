import React from 'react';
import axios from 'axios';


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
                code: code
            }
        })
            .then( res => console.log(res.data))
            .catch(err => console.log(err));
    };
    render() {
        return (
            <div>
                <h1>Success login</h1>
            </div>
        )
    }

}

export default Success;