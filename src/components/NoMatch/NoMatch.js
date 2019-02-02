import React, { Component } from 'react';
import Jumbotron from "reactstrap/es/Jumbotron";

class NoMatch extends Component {
    render() {
        return (
          <Jumbotron>
              <h1>Sorry, we couldn't get that page for you.</h1>
              <p>But we might be able to help you <a href="/options" className={"btn btn-link m-0 p-0 mb-1"}>get back your salary</a>.</p>
          </Jumbotron>
        );
    }
}

export default NoMatch;