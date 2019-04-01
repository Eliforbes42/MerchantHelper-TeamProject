import React from 'react';
import Alert from 'react-bootstrap/Alert';

class CreateUser extends React.Component {
    constructor(props){
        super(props)
    };

    render() {
        return (
            <div>
                <Alert variant='success'>
                    Github successfully logged in! Please create a username to continue
                </Alert>
                <h1>Create User!</h1>
                <div>
                    <form>
                        <label>
                            Name:
                        <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateUser;