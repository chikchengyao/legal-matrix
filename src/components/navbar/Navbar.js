import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import "./Navbar.css"

class Navbar extends Component {
    render() {
        return (
            <div className="navigation-bar">
                <Row >
                    <Col>
                        asdf
                    </Col>
                    <Col md="2">
                        <h4>Cases</h4>
                    </Col>
                    <Col md="2">
                        <h4>Know your options</h4>
                    </Col>
                    <Col md="auto">
                        <Row>
                            <Col xs="12">
                                <h4>Bringing legal advice</h4>
                            </Col>
                            <Col xs="12">
                                <h4>to the masses</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Navbar;