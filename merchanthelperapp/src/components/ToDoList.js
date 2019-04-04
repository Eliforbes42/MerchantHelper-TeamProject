import React from 'react';
import { Alert, Card, Button, Col, Row, Container } from 'react-bootstrap';
import sample from '../mockdata/toDoItems.json';
import moment from 'moment';
import Navbar from './navbar/navbar'
import {
    Switch,
    Route,
    Redirect
}              from 'react-router-dom';


class ToDoList extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            width: 0, 
            height: 0, 
            hideAlert: false,
            toDoData: [],
            rowCount: 3
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    };

    //Component did mount is called every time a component is fully rendered
    //Here we set our mock data or real data in our states
    //Also setup listener to respond to current window dimensions
    componentDidMount(){
        this.setState({toDoData: sample});
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    //Update window dimesnions is meant to change the layout of the app depending on
    //  the current screen size. 1000+ is generally full screen and 300-500 is usually
    //  mobile.
    //The width's and height's our saved in our states.
    updateWindowDimensions(){
        if(window.innerWidth > 1000)
            this.state.rowCount = 3;
        else if (window.innerWidth > 600)
            this.state.rowCount = 2;
        else
            this.state.rowCount = 1;

        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    //addCards() is a parent function that contains an inner helper 
    //  function, toDoItem(item) to build a single card. The data 
    //  necessary to populate the card is passed in to the helper function.
    //  each card also uses the completeToDo(id) function which stores the card's
    //  unique ID, this way we can keep track of which card was just clicked on.
    addCards = () => {
        const toDoItem = (item) => {
            return (
            <Col>
            <center>
            <Card id={item.id} bg="dark" style={{ width: '13rem', "box-shadow":'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
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
        return this.formatRows(this.state.rowCount, this.groupByCount(this.state.rowCount,items));
    }

    //completeToDo(cardId) is used to identify which card was
    //  just clicked by passing in a cardId and search the toDoData
    //  for the mathching id. It removes the card by appending each 
    //  item to a new temp array and returning the temp array which is
    //  missing the selected value with the passed in id.
    completeToDo = (cardId) => {
        let temp = [];
        this.state.toDoData.map(item => {
            if(item.id != cardId){
                temp.push(item);
            }
        })
        this.setState({toDoData: temp});
    }
    //Helper function to group cards in a row by a set count
    formatRows = (countsOf, data) => {
        let result = [];
        data.map(item => {
            result.push(
                <Row style={{height: '15rem'}}>
                    {item}
                </Row>
            )
        })
        return (
            <Container style={{width: '100%'}}>
            {result}
            </Container>
        );
    }
    //Helper function to group cards in a row by a set count
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
    
    //loginAlert() checks if it is necessary to show the user just logged
    //  in successfully from github. Since todoList is the landing page after
    //  logging in, we check if we should show the success alert or not.
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
                <Navbar history={this.props.history}/>
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