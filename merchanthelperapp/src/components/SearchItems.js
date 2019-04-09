import React from 'react';
import { Alert, FormControl, Button, ButtonToolbar, InputGroup, Row, Table } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Navbar from './navbar/navbar';
import Loading from './loadingdots/loading'

class SearchItems extends React.Component {
    constructor(props){
        super(props)
        this.handleFormChange = this.handleFormChange.bind(this);  
        this.getItems = this.getItems.bind(this);
        this.handleClick = this.handleClick.bind(this);


    };

    state = {
        clicked: false,
        isFetched: false,
        gunpowderData: [],
        animalData: [],
        chickenButton: false,
        pigButton: false,
        snakeButton: false,
        locale: ''
    }

    componentDidMount() {
    }

    //This Function sets the state for the gunpowder and animal data
    parseTable = (gp, animals) => {
        this.setState({gunpowderData: [gp.name, gp.locale], animalData: [animals.name, animals.locale] , isFetched: true}) 
    }


    /*
    * Fetches the gunpowder and animals, and calls parseTable
    */
    getItems = () => {
        (async () => {
            const gunpowder = await fetch('/api/islands/getGunpowder?locale=' +this.state.locale, {
                method: 'GET'
            })
            const animals = await fetch(this.query(), {
                method: 'GET'
            })
            console.log(this.query())
            const gunpowderData = await gunpowder.json()
            const animalData = await animals.json()
            console.log(gunpowderData);
            console.log(animalData)
            this.parseTable(gunpowderData, animalData)
            return;            
        })()

    
    }
    
    /*
    * Generates the JSX for our table after the query button has been pressed
    */
    generateTable = (currLoc) => {
        return (
            <Table striped bordered hover variant='dark' style={{marginRight: '1%', marginLeft: '1%'}}>
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Name</th>  
                </tr>
            </thead>

            <tbody>
            <tr>
                <td>{this.state.gunpowderData[1]}</td>
                <td>{this.state.gunpowderData[0]}</td>
            </tr>
            <tr>
                <td>{this.state.animalData[1]}</td>
                <td>{this.state.animalData[0]}</td>
            </tr>
            </tbody>
            </Table>
        )
    }

    /*
    * Generates the JSX components for use, including the button
    */
    generateBtns = () => {
        const animals = ['Chicken', 'Pig', 'Snake']
        const buttons = animals.map((val, index) => {
            if (index == 0 && this.state.chickenButton)
            {
                return (
                    <Button onClick={()=>{this.animalBtnHandler(`${val}`);}}>{val}</Button>
                )
            }
            if (index == 1 && this.state.pigButton)
            {
                return (
                    <Button onClick={()=>{this.animalBtnHandler(`${val}`);}}>{val}</Button>
                )
            }
            if (index == 2 && this.state.snakeButton)
            {
                return (
                    <Button onClick={()=>{this.animalBtnHandler(`${val}`);}}>{val}</Button>
                )
            }
            return  (
                <Button variant="dark" onClick={()=>{this.animalBtnHandler(`${val}`);}}>{val}</Button>
            )
        })  
        return buttons
    }

    /*
    * Generate animal buttons for use later on, using the map function
    * so that the value of the button can be used later on
    */
    animalBtnHandler = (animal) => {
        switch (animal)
        {
            case 'Chicken':
                this.setState({chickenButton: !this.state.chickenButton});
                console.log('chickenBtnClicked: ', !this.state.chickenButton)
                return;
            case 'Pig':
                this.setState({pigButton: !this.state.pigButton});
                console.log('pigBtnClicked: ', !this.state.pigButton)
                return;
            case 'Snake':
                this.setState({snakeButton: !this.state.snakeButton});
                console.log('snakeBtnClicked: ', !this.state.snakeButton)
                return;
        }
    }

    handleFormChange(e) {
        this.setState({locale: e.target.value})
    }

    /* 
    * Form the api url call with the different parameters from the state
    * once completed return api url
    */
    query() {
        let url = '/api/islands/getAnimals?locale=' + this.state.locale
        if (this.state.chickenButton)
        {
            url += '&animals=chicken'
        }
        if (this.state.pigButton)
        {
            url += '&animals=pig'
        }
        if (this.state.snakeButton)
        {
            url += '&animals=snake'
        }
        return url;
    }

    handleClick() 
    {
        if (this.state.locale == '' || this.state.locale.length < 2)
        {
            return
        }

        this.setState({clicked: true})
        this.getItems()
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                <center>
                <div style={{height: '1rem'}} />
                <h1>Search for Items</h1>
                </center>
                <div>
                    <ButtonToolbar className="pull-left" style={{addingBottom: 30, paddingLeft: 30, width: 300}}>
                        <ButtonGroup>
                            {this.generateBtns()}
                        </ButtonGroup>
                        <InputGroup style={{paddingTop: 5, paddingBottom: 5}}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="btnGroupAddon">Locale</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id='localeForm'
                            type="text"
                            placeholder="e.g. K12"
                            aria-label="Input group example"
                            aria-describedby="btnGroupAddon"
                            onChange={this.handleFormChange}
                        />
                        </InputGroup>
                        <Button  onClick={this.handleClick}>Look for items</Button>
                    </ButtonToolbar>
                </div>

                <div style={{height: '1vh'}}/>
                <center>
                {this.state.clicked? (this.state.isFetched? this.generateTable() : <Loading/>) : null}
                </center>
            </div>
        )
    }
}

export default SearchItems;