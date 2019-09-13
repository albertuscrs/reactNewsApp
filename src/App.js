import React, { Component } from 'react';
import list from './list';
import { Container, Row, Form, FormGroup } from 'react-bootstrap';
import './App.css';
import { id } from 'postcss-selector-parser';

function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: ''
    }

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
  }

  removeItem(id){
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  searchValue(event){
    this.setState({ searchTerm: event.target.value });
  }

  render(){
    const { list, searchTerm } = this.state;
    console.log(this);
    return (
        <div className="App">

          <Container>
            <Row>
              <div className="jumbotron">
                <Search
                  onChange={ this.searchValue }
                  value={ searchTerm }
                >News App</Search>
              </div>
            </Row>
          </Container>

          <Table
            list={ list }
            searchTerm={ searchTerm }
            removeItem={ this.removeItem }
          />
          
      </div>
    );
  }
}

const Search = ({ onChange, value, children }) => {
  return(
    <Form>
       <h1 style={{ fontWeight: 'bold' }}>{ children }</h1> <hr style={{ border: '2px solid black', width: '100px' }} />
        <div className="input-group">
          <input 
            className="form-control full-width searchForm"
            type="text"
            onChange={ onChange }
            value={ value }
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary searchBtn"
              type="submit"
            >
              Search
            </button>
          </span>
          </div>
    </Form>
  )
}

const Table = ({ list, searchTerm, removeItem }) => {
  return(
    <div>
      {
        list.filter( isSearched(searchTerm) ).map(item =>
          <div key={ item.objectID }>
              <h1>  <a href = { item.url }>{ item.title }</a> by { item.author } </h1>
              <h4> { item.num_comments } Comments | { item.points } Points </h4>
              <Button
                type="button"
                onClick={ () => removeItem(item.objectID) }
              >
                Remove me
              </Button>
          </div>
        )
      }
    </div>
  )
}

const Button = ({ onClick, children }) =>
    <button
        onClick={ onClick }>
        { children }
    </button>

export default App;
