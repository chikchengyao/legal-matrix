import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import goko_img from '../../res/img/goko.png';
import ivan_img from '../../res/img/ivan.png';
import baolong_img from '../../res/img/baolong.png';
import chik_img from '../../res/img/chik.png';
import weiquan_img from '../../res/img/weiquan.png';

class AboutUs extends Component {
    render() {

        let size = 200;

        return (<Row className={"mt-5 justify-content-center"}>
            <Col xs={"12"}>
                <img height={size * 2} src={goko_img} alt={"logo"}/>
            </Col>
            <Col xs={"12"}>
                <Row className={"justify-content-center"}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <img src={ivan_img} height={size} alt={"logo"}/>
                            </td>
                            <td>
                                <img src={baolong_img} height={size} alt={"logo"}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Ivan</h6>
                            </td>
                            <td>
                                <h6>Bao Long</h6>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={chik_img} height={size} alt={"logo"}/>
                            </td>
                            <td>
                                <img src={weiquan_img} height={size} alt={"logo"}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h6>Cheng Yao</h6>
                            </td>
                            <td>
                                <h6>Wei Quan</h6>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                </Row>
            </Col>
        </Row>);
    }
}

export default AboutUs;