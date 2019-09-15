import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import * as serviceWorker from './serviceWorker';
import Javascript from './components/Javascript';
import Python from './components/Python';

const Root = () =>
<Router basename='/react-news-app'>
  <div>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href='/'>
            NEWSAPP
        </Navbar.Brand>
      <Nav className="mr-auto">
          <Nav.Link href='/' >Home</Nav.Link>
          <Nav.Link href='/javascript' >Javascript</Nav.Link>
          <Nav.Link href='/python' >Python</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Made with love: <a href="https://github.com/albertuscrs/reactNewsApp">GitHub</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>

    <Route exact path='/' component={ App } />
    <Route exact path='/javascript' component={ Javascript } />
    <Route exact path='/python' component={ Python } />
  </div>
</Router>

// const About = () =>
// <div>
//   <h1>This is about page</h1>
// </div>

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
