import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavigationBar from './components/navbar/Navbar';
import AboutUs from './components/AboutUs/AboutUs';
import OptionTree from './components/Tree/Tree';
import NoMatch from './components/NoMatch/NoMatch';
import Cases from './components/Cases/Cases';
import JudgementExpired from "./components/JudgementExpired/JudgementExpired";
import JudgementDefault from "./components/JudgementDefault/JudgementDefault";
import Footer from "./components/Footer/Footer"
import Trends from "./components/Trends/Trends"
import Jumbotron from "reactstrap/es/Jumbotron";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationBar/>
                        <div className={"mt-5 mb-5"}/>
                        <Switch>
                            <Route exact path="/" component={OptionTree}/>
                            <Route exact path={"/cases"} component={Cases}/>
                            <Route exact path={"/options"} component={OptionTree}/>
                            <Route exact path={"/aboutus"} component={AboutUs}/>
                            <Route exact path={"/claim"} component={JudgementDefault}/>
                            <Route exact path={"/expired"} component={JudgementExpired}/>
                            <Route exact path={"/trends"} component={Trends}/>
                            <Route component={NoMatch}/>
                        </Switch>
                        <Jumbotron style={{"background-color": "transparent"}}>
                            <Row>
                                <Col xs={"12"} lg={"auto"}>
                                    <h5>&nbsp;</h5>
                                </Col>
                                <Col xs={"12"} lg={"auto"}>
                                    <h5>&nbsp;</h5>
                                </Col>
                                <Col/>
                                <Col xs={"12"} lg={"auto"}>
                                    <p className={"copyright"}>&nbsp;</p>
                                </Col>
                            </Row>
                        </Jumbotron>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
