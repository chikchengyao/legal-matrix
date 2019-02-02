import React, {Component} from 'react';
import { Button } from 'reactstrap';

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trouble: null, // either "fired" or "salary"
            salary: null, // number, monthly salary
            months: null, // number, number of months owed
            still_working: null // bool, still working
        }
    }

    render() {
        return (
            <div>
                <Button color="success">Hello</Button>
            </div>
        );
    }
}

export default Tree;