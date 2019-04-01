import React from 'react';
import { Alert, Card, Button, Col, Row, Container } from 'react-bootstrap';
import sample from '../mockdata/toDoItems.json';
import moment from 'moment';


class ToDoList extends React.Component {
    constructor(props){
        super(props)
    };

    state = {
        hideAlert: false,
        toDoData: []
    }

    componentDidMount(){
        this.setState({toDoData: sample});
    }

    addCards = () => {
        const toDoItem = (item) => {
            return (
            <Col>
            <center>
            <Card id={item.id} bg="dark" style={{ width: '20vw', "box-shadow":'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Card.Body>
                <Card.Title style={{color:'white'}}>{item.title}</Card.Title>
                <Card.Text style={{color:'white'}}>
                {item.description}
                </Card.Text>
                <Button variant="success" onClick={() => this.completeToDo(`${item.id}`)}>Complete</Button>
            </Card.Body>
            </Card>
            </center>
            </Col>
        )};
        let items = [];
        this.state.toDoData.map(item => {
            items.push(toDoItem(item));
        })
        return this.formatRows(3, this.groupByCount(4,items));
    }

    completeToDo = (cardId) => {
        let temp = [];
        this.state.toDoData.map(item => {
            if(item.id != cardId){
                temp.push(item);
            }
        })
        this.setState({toDoData: temp});
    }

    formatRows = (countsOf, data) => {
        let result = [];
        data.map(item => {
            result.push(
                <Row style={{height: '30rem'}}>
                    {item}
                </Row>
            )
        })
        return (
            <Container style={{width: '80%'}}>
            {result}
            </Container>
        );
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
        if(localStorage.getItem('user') != 'undefined' && !this.state.hideAlert && this.props.showAlert){
            return (
                <Alert variant='success'>
                    Github successfully logged in! Welcome {localStorage.getItem('user')}
                    <a style={{float: 'right'}} href="#" onClick={this.shouldHideAlert}>
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
            <div style={{width: '100vw'}}>
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