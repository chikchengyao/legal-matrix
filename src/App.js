import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavigationBar from './components/navbar/Navbar'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavigationBar/>
                        <hr/>
                        <Switch>
                            <Route exact path="/" component={NavigationBar}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
