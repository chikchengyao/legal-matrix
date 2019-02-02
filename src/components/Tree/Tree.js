import React, {Component} from 'react';
import {Row, Col, Button, Jumbotron, InputGroup, InputGroupAddon, Input} from 'reactstrap';

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trouble: null, // either "fired" or "unpaid"
            salary: null, // number, monthly salary
            months: null, // number, number of months owed
            still_working: null // bool, still working
        };
    }

    test() {
        console.log(test);
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    handle_Q1_fired() {
        this.updateState({trouble: "fired"});
    }

    handle_Q1_unpaid() {
        this.updateState({trouble: "unpaid"});
    }

    renderButton(active, callback, text) {
        if (active) {
            return <Button color={"success"} onClick={callback}>{text}</Button>
        } else {
            return <Button outline color={"success"} onClick={callback}>{text}</Button>
        }
    }

    renderQ1() {
        let firedButton = this.renderButton(
            this.state.trouble === "fired",
            () => this.handle_Q1_fired(),
            "My employer fired me"
        );
        let unpaidButton = this.renderButton(
            this.state.trouble === "unpaid",
            () => this.handle_Q1_unpaid(),
            "My employer has not paid my salary"
        );

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>What job trouble are you facing?</h3>
                <div>
                    {firedButton}
                    &nbsp;
                    {unpaidButton}
                </div>
            </Jumbotron>
        )
    }

    renderQ2() {
        if (this.state.trouble === null) {
            return;
        }

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>What was your salary?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input/>
                            <InputGroupAddon addonType="append"><Button color="secondary">OK!</Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }

    render() {

        let q1 = this.renderQ1();
        let q2 = this.renderQ2();
        return (
            <div>
                {q1}
                {q2}
            </div>
        );
    }
}

export default Tree;