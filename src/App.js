import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavigationBar from './components/navbar/Navbar'
import AboutUs from './components/AboutUs/AboutUs'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path="/" component={AboutUs}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
