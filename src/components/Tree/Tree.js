import React, {Component, createRef} from 'react';
import {Row, Col, Button, NavLink, Jumbotron, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import * as JsPDF from 'jspdf';

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

        this.bottomRef = createRef();

        this.jumbotron_dimen = "mb-0 p-3"

        this.generateLetter();
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }


    static renderButton(active, callback, text, color = "success") {
        if (active) {
            return <Button color={color} onClick={callback}>{text}</Button>
        } else {
            return <Button outline color={color} onClick={callback}>{text}</Button>
        }
    }

    renderBottomRef() {
        return (
            <div>
                <div ref={this.bottomRef}/>
            </div>
        )
    }

    scrollToBottom() {
        console.log(this.bottomRef);
        if(this.bottomRef.current) {
            this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
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
        let noButton = Tree.renderButton(
            this.state.migrant === false,
            () => this.handle_Q0_not_migrant(),
            "No",
            "danger"
        );
        let yesButton = Tree.renderButton(
            this.state.migrant === true,
            () => this.handle_Q0_migrant(),
            "Yes"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
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

        let firedButton = Tree.renderButton(
            this.state.trouble === "fired",
            () => this.handle_Q1_fired(),
            "My employer fired me"
        );
        let unpaidButton = Tree.renderButton(
            this.state.trouble === "unpaid",
            () => this.handle_Q1_unpaid(),
            "My employer has not paid my salary"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen}  style={{"background": "transparent"}}>
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
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>What was your salary?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input type="number" onChange={(evt) => {
                                this.updateState({temp_salary: evt.target.value});
                            }}/>
                            <InputGroupAddon addonType="append">
                                {Tree.renderButton(
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
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>How many months of salary does your boss owe you?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <Input type="number" onChange={(evt) => {
                                this.updateState({temp_months: evt.target.value});
                            }}/>
                            <InputGroupAddon addonType="append">
                                {Tree.renderButton(
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

        let notWorkingButton = Tree.renderButton(
            this.state.working === false,
            () => this.handle_Q4_not_working(),
            "No",
            "danger"
        );
        let workingButton = Tree.renderButton(
            this.state.working === true,
            () => this.handle_Q4_working(),
            "Yes"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
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
    // Judgements
    ////////////////////////////////////////////////

    renderJudgmentDefault() {
        // if (this.state.working === null || this.state.months === null) {
        //     return;
        // }

        if ((this.state.working === false && (Number(this.state.months) <= 6))
            || (this.state.working === true && (Number(this.state.months) <= 12))) {
            return (
                <Jumbotron style={{"text-align": "left"}}>
                    <h3>Good news!</h3>
                    <p>
                        You can most likely claim the unpaid salary payments from your employer. You should either:
                    </p>
                    <ul>
                        <li>Speak to your boss amicably, if you have not. If that does not work, you may:</li>
                        <li>Send him a letter of demand for your unpaid salary. Generate that letter here, for free.
                        </li>
                    </ul>
                </Jumbotron>
            )
        }
    }

    renderJudgementSmallClaim() {
        let claim_amount = Number(this.state.months) * Number(this.state.salary);

        if (claim_amount > 10000) {
            return;
        }

        return (
            <p>
                Your claim amount is {claim_amount}. Make an appointment with Tripartite Alliance for Dispute
                Management to file a claim here:
                <NavLink href={"http://www.tadm.sg/eservices/employees-file-salary-claim/."}>
                    http://www.tadm.sg/eservices/employees-file-salary-claim/
                </NavLink>
            </p>
        )
    }

    renderJudgementExpired() {
        if ((this.state.working === false && Number(this.state.months > 6))
            || (this.state.working === true && Number(this.state.months > 12))
        ) {
            return (
                <Jumbotron style={{"text-align": "left"}}>
                    <h3>Your salary claim might have expired!</h3>
                    <p>
                        However, you <i>should</i> still seek professional legal
                        advice.
                    </p>

                    <p>
                        <b>Here is a list of suitable law firms with free first consultation:</b>
                    </p>
                    <p>
                        PLACEHOLDER Show a list of law firms that deal with small claims + provide free first-time
                        consultatations. Show office contact numbers
                    </p>

                    <p>
                        <b>Need free legal advice? Go to a legal clinic near you!</b>
                    </p>
                    <p> PLACEHOLDER Ask for permission to access location Show nearest legal clinics. Pull clinics info
                        from http://probono.lawsociety.org.sg/Pages/Legal-Clinic-Locator.aspx </p>

                    {this.renderJudgementSmallClaim()}
                </Jumbotron>
            )
        }
    }

    ////////////////////////////////////////////////
    // Create letter
    ////////////////////////////////////////////////

    generateLetter() {
        let doc = new JsPDF();
        doc.setFont("times");
        doc.text("Hello World!", 10, 10);
        doc.save("a4.pdf");
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
                {this.renderJudgmentDefault()}
                {this.renderJudgementExpired()}
                {this.renderBottomRef()}
                {this.scrollToBottom()}
            </div>
        );
    }
}

export default Tree;