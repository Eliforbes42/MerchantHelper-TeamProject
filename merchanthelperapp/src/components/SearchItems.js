import React from 'react';
import { Alert, Card, Button, Col, Row, Table } from 'react-bootstrap';
import Navbar from './navbar/navbar';

class SearchItems extends React.Component {
    constructor(props){
        super(props)
    };

    state = {
        items: [],
        tableData: []
    }

    componentDidMount() {
        this.setState({items: [{test: 'test'}]})
    }

    parseTable = (data) => {
        this.setState({tableData: [data.name, data.locale]}) 
    }


    getItems = () => {
        let stuff = (async () => {
            //TODO: add location
            const result = await fetch('/api/islands/getGunpowder?locale=K1', {
                method: 'GET',
            })
            const myjson = await result.json()
            return this.parseTable(myjson)            
        })()

    
    }
    
    generateTable = (currLoc) => {
        this.getItems()
        let tbl = (
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Name</th>  
                </tr>
            </thead>

            <tbody>
            <tr>
                <td>{this.state.tableData[1]}</td>
                <td>{this.state.tableData[0]}</td>
            </tr>
            </tbody>
            </Table>
            )
        return tbl
    }

    render() {

        return (
            <div>
                <Navbar history={this.props.history}/>
                <center>
                <div style={{height: '1rem'}} />
                <h1>Search for Items</h1>
                </center>
                {this.generateTable()};
            </div>
        )
    }
}

export default SearchItems;