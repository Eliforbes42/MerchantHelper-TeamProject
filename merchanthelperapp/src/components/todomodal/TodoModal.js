/* App.jsx */
import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Alert, Card, Button, Col, Row, Container, Modal, Form } from 'react-bootstrap';
import {
  Switch,
  Route,
  Redirect
}              from 'react-router-dom';

class TodoModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);   
        this.handleFormChange = this.handleFormChange.bind(this);  

        this.state = {
            show: false,
            title: '',
            location: '',
            description: ''
        };
    }
  
    handleClose() {
        this.setState({ show: false });
    }

    handleSave(){
        const finalData = {
            id: '10',
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            complete: 0
        }
        this.props.passed(finalData);
        this.setState({ show: false });
    }
  
    handleShow() {
        this.setState({ show: true });
    }

    handleFormChange(e) {
        switch (e.target.id){
            case 'title':
                this.setState({ title: e.target.value });
                break;
            case 'location':
                this.setState({ location: e.target.value });
                break;
            case 'description':
                this.setState({ description: e.target.value });
                break;
        }
    }

    //addForm() simply renders the forms for user input on the modal popup
    addForm = () => {
        return(
            <Form>
            <Form.Group controlId="todoForm.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="email" placeholder="My awesome todo title" id='title' onChange={this.handleFormChange} />
            </Form.Group>
            <Form.Group controlId="todoForm.Location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="email" placeholder="optional" id='location' onChange={this.handleFormChange}/>
            </Form.Group>
            <Form.Group controlId="todoForm.Description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" id='description' onChange={this.handleFormChange}/>
            </Form.Group>
            </Form>
        );
    }
  
    render() {
      return (
        <div style={{width: '100vw'}}>
        <center>
          <Button variant="primary" onClick={this.handleShow} style={{width: '13rem'}}>
            Create ToDo Item
          </Button>
        </center>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New To Do Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.addForm()}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
  export default TodoModal;