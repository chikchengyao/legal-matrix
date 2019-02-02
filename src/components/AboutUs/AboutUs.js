import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import goko_img from '../../res/img/goku.png';

class AboutUs extends Component {
    render() {
        return (<Row>
            <Col xs={"12"} lg={"6"}>
                <img src={goko_img} alt={"logo"}/>
            </Col>
            <Col xs={"12"} lg={"6"}>
                <Row>
                    <Col>
                        ivan
                    </Col>
                    <Col>
                        bao long
                    </Col>
                </Row>
                <Row>
                    <Col>
                        cy
                    </Col>
                    <Col>
                        wei quan
                    </Col>
                </Row>
            </Col>
        </Row>);
    }
}

export default AboutUs;