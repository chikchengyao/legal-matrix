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

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path="/" component={OptionTree}/>
                            <Route exact path={"/cases"} component={Cases}/>
                            <Route exact path={"/options"} component={OptionTree}/>
                            <Route exact path={"/aboutus"} component={AboutUs}/>
                            <Route exact path={"/claim"} component={JudgementDefault}/>
                            <Route exact path={"/expired"} component={JudgementExpired}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
