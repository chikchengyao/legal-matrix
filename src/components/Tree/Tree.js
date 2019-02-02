import React, {Component} from 'react';
import {Row, Col, Button, Jumbotron, InputGroup, InputGroupAddon, Input} from 'reactstrap';

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            migrant: null, //
            trouble: null, // either "fired" or "unpaid"
            salary: null, // number, monthly salary
            months: null, // number, number of months owed
            working: null // bool, still working
        };
    }

    test() {
        console.log(test);
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }


    renderButton(active, callback, text, color="success") {
        if (active) {
            return <Button color={color} onClick={callback}>{text}</Button>
        } else {
            return <Button outline color={color} onClick={callback}>{text}</Button>
        }
    }

    //////////////////////////////////////////
    // Q0
    //////////////////////////////////////////

    handle_Q0_migrant() {
        this.updateState({migrant: true});
    }

    handle_Q0_not_migrant() {
        this.updateState({migrant: false});
    }

    renderQ0() {
        let noButton = this.renderButton(
            this.state.migrant === false,
            () => this.handle_Q0_not_migrant(),
            "No",
            "danger"
        );
        let yesButton = this.renderButton(
            this.state.migrant === true,
            () => this.handle_Q0_migrant(),
            "Yes"
        );

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>Are you a migrant worker?</h3>
                <div>
                    {noButton}
                    &nbsp;
                    {yesButton}
                </div>
            </Jumbotron>
        )
    }


    //////////////////////////////////////////
    // Q1
    //////////////////////////////////////////

    handle_Q1_fired() {
        this.updateState({trouble: "fired"});
    }

    handle_Q1_unpaid() {
        this.updateState({trouble: "unpaid"});
    }


    renderQ1() {
        if (this.state.migrant === null || this.state.migrant === false) {
            return;
        }

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

    //////////////////////////////////////////
    // Q2
    //////////////////////////////////////////

    renderQ2() {
        if (this.state.trouble === null || this.state.trouble === "fired") {
            return;
        }

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>What was your salary?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input type="number" onChange={(evt) => { this.updateState({temp_salary: evt.target.value});}}/>
                            <InputGroupAddon addonType="append">
                                {this.renderButton(
                                    this.state.salary,
                                    () => this.updateState({salary: this.state.temp_salary}),
                                    "OK!")}
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }


    //////////////////////////////////////////
    // Q3
    //////////////////////////////////////////

    renderQ3() {
        if (!this.state.salary) {
            return;
        }

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>How many months of salary does your boss owe you?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <Input type="number" onChange={(evt) => { this.updateState({temp_months: evt.target.value});}}/>
                            <InputGroupAddon addonType="append">
                                {this.renderButton(
                                    this.state.months,
                                    () => this.updateState({months: this.state.temp_months}),
                                    "OK!")}
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }

    //////////////////////////////////////////
    // Q4
    //////////////////////////////////////////

    handle_Q4_not_working() {
        this.updateState({working: false});
    }

    handle_Q4_working() {
        this.updateState({working: true});
    }


    renderQ4() {
        if (!this.state.months) {
            return;
        }

        let notWorkingButton = this.renderButton(
            this.state.working === false,
            () => this.handle_Q4_not_working(),
            "No",
            "danger"
        );
        let workingButton = this.renderButton(
            this.state.working === true,
            () => this.handle_Q4_working(),
            "Yes"
        );

        return (
            <Jumbotron style={{"background": "transparent"}}>
                <h3>Are you still working for your employer?</h3>
                <div>
                    {notWorkingButton}
                    &nbsp;
                    {workingButton}
                </div>
            </Jumbotron>
        )
    }




    ////////////////////////////////////////////////
    // main
    ////////////////////////////////////////////////

    render() {

        return (
            <div>
                {this.renderQ0()}
                {this.renderQ1()}
                {this.renderQ2()}
                {this.renderQ3()}
                {this.renderQ4()}
            </div>
        );
    }
}

export default Tree;