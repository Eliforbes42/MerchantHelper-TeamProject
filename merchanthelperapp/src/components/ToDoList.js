import React from 'react';
import { Alert, Card, Button, Col, Row } from 'react-bootstrap';


class ToDoList extends React.Component {
    constructor(props){
        super(props)
    };

    state = {
        hideAlert: false
    }

    addCards = () => {
        const toDoItem = (cardId) => {
            return (
            <Col>
            <center>
            <Card id={cardId} bg="dark" style={{ width: '25rem',  "box-shadow":'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Card.Body>
                <Card.Title style={{color:'white'}}>Merchant Quest</Card.Title>
                <Card.Text style={{color:'white'}}>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="success" onClick={() => this.completeToDo(cardId)}>Complete</Button>
            </Card.Body>
            </Card>
            </center>
            </Col>
        )};
        let items = [];
        for(let i = 0; i < 5; i++){
            items.push(toDoItem(`Card-${i}`));
        }
        return this.formatRows(3, this.groupByCount(3,items));
    }

    completeToDo = (data) => {
        document.getElementById(data).hidden = true;
    }

    formatRows = (countsOf, data) => {
        let result = [];
        data.map(item => {
            result.push(
                <div style={{height: '15rem'}}>
                <Row>
                    {item}
                </Row>
                </div>
            )
        })
        return result;
    }

    groupByCount = (countsOf, data) => {
        let result = []
        let sub = []
        let modIndex = 0;
        for(let i = 0; i<data.length; i++){
            if(countsOf == sub.length){
                modIndex = 0;
                result.push(sub);
                sub = [];
            }
            sub.push(data[i]);
            modIndex++;
        }
        if(sub.length > 0){
            result.push(sub);
        }
        return result;
    }

    loginAlert = () => {
        if(localStorage.getItem('user') != 'undefined' && !this.state.hideAlert){
            return (
                <Alert variant='success'>
                    Github successfully logged in! Welcome {localStorage.getItem('user')}
                    <a style={{float: 'right'}} onClick={this.shouldHideAlert}>
                        x
                    </a>
                </Alert>
            )
        }
    }

    shouldHideAlert = () => {
        this.setState({hideAlert: true});
    }

    render() {
        return (
            <div>
                {this.loginAlert()}
                <center>
                <div style={{height: '1rem'}} />
                <h1>To Do List</h1>
                </center>
                <div style={{height: '1rem'}} />
                {this.addCards()}
            </div>
        )
    }
}

export default ToDoList;