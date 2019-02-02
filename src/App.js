import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavigationBar from './components/navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'
import Tree from './components/Tree/Tree'
import NoMatch from './components/NoMatch/NoMatch'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path="/" component={AboutUs}/>
                            <Route exact path={"/options"} component={Tree}/>
                            <Route exact path={"/aboutus"} component={AboutUs}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
