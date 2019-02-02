import React, {Component} from 'react';
import Jumbotron from "reactstrap/es/Jumbotron";
import "./Footer"
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import firestore from "../../firestore";

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            workersServed: null,
            documentsServed: null
        }
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    fetchServed() {
        const db = firestore.firestore();

        let workers = db.collection("userdata").get();
        workers.then((res) => (this.updateState({workersServed: res.size})));

        let documents = db.collection("letters").get();
        documents.then((res) => (this.updateState({documentsServed: res.size})));
    }

    render() {

        this.fetchServed()

        return (
            <Jumbotron style={{"background": "#B0B1B7", "margin": "0", "textAlign": "left"}}>
                <Row>
                    <Col xs={"12"}>
                        <h3>Workers served: {this.state.workersServed}</h3>
                    </Col>
                    <Col xs={"12"}>
                        <h3>Free legal documents served: {this.state.documentsServed}</h3>
                    </Col>
                </Row>
                <p className={"copyright"}>&copy; Legal Matrix (2019). All rights reserved. </p>
            </Jumbotron>
        );
    }
}

export default Footer;