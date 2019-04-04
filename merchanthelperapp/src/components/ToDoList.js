import React from 'react';
import { Alert, Card, Button, Col, Row, Container } from 'react-bootstrap';
import sample from '../mockdata/toDoItems.json';
import moment from 'moment';
import Navbar from './navbar/navbar'
import TodoModal from './todomodal/TodoModal'
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
        this.getToDoData();
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

    //getToDoData() will do an asynchronous call for all user data
    //  with the user data we pull out the todo data and then set 
    //  the state's todoData to the users data
    getToDoData = () => {
        (async () => {
            const rawData = await fetch(`/api/users/getUser?user=${localStorage.getItem('user')}`, {
                method: 'GET'
            });
            const result = await rawData.json();
            console.log(result[0].todo);
            if(result[0].todo != undefined){
                console.log(result);
                this.setState({toDoData: result[0].todo});
            }
        })();
    }

    //getToDoData() will do an asynchronous call for all user data
    //  with the user data we pull out the todo data and then set 
    //  the state's todoData to the users data
    setToDoComplete = (id) => {
        (async () => {
            const rawData = await fetch(`/api/users/todoCompleted?user=${localStorage.getItem('user')}&todoId=${id}`, {
                method: 'GET'
            });
            this.getToDoData();
        })();
    }

    //postToDoData() will do an asynchronous post request for updating
    //  the user data with the new todo item. After call this will
    //  rerender the page via getToDoData().
    postToDoData = (data) => {
        console.log(data);
        (async () => {
            const rawData = await fetch(`/api/users/addTodo?user=${localStorage.getItem('user')}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await rawData.json();
            console.log(result);
            this.getToDoData(); //call for page to rerender
        })();
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
            <Card id={item.id} bg="dark" style={{ width: '15rem', "box-shadow":'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Card.Body>
                <Card.Title style={{color:'white'}}>{item.title}</Card.Title>
                <Card.Text style={{color:'orange', height: '1rem'}}>
                Location: {item.location}
                </Card.Text>
                <Card.Text style={{color:'white'}}>
                {item.description}
                </Card.Text>
                <Button variant="success" onClick={() => this.completeToDo(`${item._id}`)}>Complete</Button>
            </Card.Body>
            </Card>
            </center>
            </Col>
        )};
        let items = [];
        this.state.toDoData.map(item => {
            if(item.complete == 0)
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
        this.setToDoComplete(cardId);
    }
    //Helper function to group cards in a row by a set count
    //  Also note that row height will add the spacing between rows!
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

    addToDoItemButton(){
        return(
            <div style={{width: '90vw'}}>
                <Button variant="primary" className="float-right" >Create todo</Button>
            </div>
        );
    }

    //updateWithNewCard is a parent function that is passed as a prop to 
    //  the child component ToDoModal which will execute the function upon
    //  the user selecting save with the new card item for the todo list
    updateWithNewCard = (data) => {
        this.postToDoData(data);
        this.getToDoData();
    }

    render() {
        return (
            <div style={{width: '100vw'}}>
                <Navbar history={this.props.history}/>
                {this.loginAlert()}
                <center>
                <div style={{height: '2rem'}} />
                <h1>To Do List</h1>
                </center>
                <div style={{height: '2rem'}} />
                <TodoModal history={this.props.history} passed={this.updateWithNewCard}/>
                <div style={{height: '3rem'}} />
                {this.addCards()}
            </div>
        )
    }
}

export default ToDoList;