import React from 'react';
import { Alert, Card, Button, Col, Row } from 'react-bootstrap';


class ToDoList extends React.Component {
    constructor(props){
        super(props)
    };

    addCards = () => {
        const toDoItem = (
            <Col>
            <Card style={{ width: '18rem'}}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
            </Col>
        );
        let items = [];
        for(let i = 0; i < 7; i++){
            items.push(toDoItem);
        }
        return this.formatRows(3, this.groupByCount(3,items));
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

    render() {
        return (
            <div>
                <Alert variant='success'>
                    Github successfully logged in! Welcome {localStorage.getItem('user')}
                </Alert>
                <h1>To Do List</h1>
                {this.addCards()}
            </div>
        )
    }
}

export default ToDoList;