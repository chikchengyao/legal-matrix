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
        workers.then((res) => {
            if (this.state.workersServed !== res.size) {
                this.updateState({workersServed: res.size});
            }
        });

        let documents = db.collection("letters").get();
        documents.then((res) => {
            if (this.state.documentsServed !== res.size) {
                this.updateState({documentsServed: res.size});
            }
        });
    }

    render() {

        this.fetchServed()

        return (
                <Jumbotron
                    style={{"margin": "0", "padding": "2em", "paddingLeft": "5em", "paddingRight":"5em", "textAlign": "left"}}>
                    <Row>
                        <Col xs={"12"} lg={"auto"}>
                            <h5>Workers served: {this.state.workersServed}</h5>
                        </Col>
                        <Col xs={"12"} lg={"auto"}>
                            <h5>Free legal documents served: {this.state.documentsServed}</h5>
                        </Col>
                        <Col/>
                        <Col xs={"12"} lg={"auto"}>
                            <p className={"copyright"}>&copy; Legal Matrix (2019). All rights reserved. </p>
                        </Col>
                    </Row>
                </Jumbotron>
        );
    }
}

export default Footer;