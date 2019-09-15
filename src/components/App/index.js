import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from '../Table/index';
import { Button, Loading } from '../Button/index';
import Search from '../Search/index';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constant/index';

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
// console.log(url);

// function isSearched(searchTerm){
//   return function(item){
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

const withLoading = (Component) => ({ isLoading, ...rest}) =>
  isLoading ? <Loading /> : <Component {...rest} />

const updateTopStories = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return { results: { ...results, [searchKey]: { hits: updatedHits, page } },
    isLoading: false
  }
}
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    }

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  checkTopStoriesSearchTerm(searchTerm){
    return !this.state.results[searchTerm];
  }

  setTopStories(result){
    const { hits, page } = result;

    this.setState(updateTopStories(hits, page));
  }

  fetchTopStories(searchTerm, page){

    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch(e => e);
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.checkTopStoriesSearchTerm(searchTerm)){
      this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  removeItem(id){
    const { results, searchKey } = this.state;
    const { hits } = results[searchKey];
    const updatedList = hits.filter(item => item.objectID !== id);
    this.setState({results: {...results, [searchKey]: {hits: updatedList}}});
  }

  searchValue(event){
    this.setState({ searchTerm: event.target.value });
  }

  render(){
    const { results, searchTerm, searchKey, isLoading } = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(this);
    return (
      <div className='col-sm-10 offset-1'>
        <Container>
          <Row>
            <div className="jumbotron col-sm-6 offset-md-3">
              <Search
                onChange={ this.searchValue }
                value={ searchTerm }
                onSubmit= { this.onSubmit }
              >News App</Search>
            </div>
          </Row>
        </Container>
        <Container>
          <Row>
            <Table
              list={ list }
              removeItem={ this.removeItem }
              />
            <div className="text-center col-md-6 offset-md-3 alert">
              
                <ButtonWithLoading
                  isLoading={ isLoading }
                  className="btn btn-dark btn-sm"
                  onClick={ () => this.fetchTopStories(searchTerm, page + 1) }
                  >
                  Load More
                </ButtonWithLoading>
              
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

const ButtonWithLoading = withLoading(Button);

export default App;
