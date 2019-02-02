import React, {Component, createRef} from 'react';
import {Row, Col, Button, Jumbotron, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import firestore from '../../firestore';
import JudgementExpired from "../JudgementExpired/JudgementExpired"
import JudgementDefault from "../JudgementDefault/JudgementDefault";

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            migrant: null, //
            trouble: null, // either "fired" or "unpaid"
            salary: null, // number, monthly salary
            months: null, // number, number of months owed
            working: null, // bool, still working

            salary_disabled: false,
            months_disabled: false,
        };

        this.bottomRef = createRef();

        this.jumbotron_dimen = "mb-0 p-3"
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }


    static renderButton(active, callback, text, margin="1") {
        let color = "secondary";
        let marginClassName = "mb-" + margin + " mr-" + margin;
        if (active) {
            return <Button className={marginClassName} color={color} onClick={callback}>{text}</Button>
        } else {
            return <Button className={marginClassName} outline color={color} onClick={callback}>{text}</Button>
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
        if (this.bottomRef.current) {
            this.bottomRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();

        this.uploadState();
    }


    //////////////////////////////////////////
    // Q0
    //////////////////////////////////////////

    handle_Q0_migrant() {
        if (this.state.migrant === null) {
            this.updateState({migrant: true});
        }
    }

    handle_Q0_not_migrant() {
        if (this.state.migrant === null) {
            this.updateState({migrant: false});
        }
    }

    renderQ0() {
        let noButton = Tree.renderButton(
            this.state.migrant === false,
            () => this.handle_Q0_not_migrant(),
            "No"
        );
        let yesButton = Tree.renderButton(
            this.state.migrant === true,
            () => this.handle_Q0_migrant(),
            "Yes"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>Firstly, are you a migrant worker?</h3>
                <div>
                    {noButton}
                    {yesButton}
                </div>
            </Jumbotron>
        )
    }


    //////////////////////////////////////////
    // Q1
    //////////////////////////////////////////

    handle_Q1_fired() {
        if (!this.state.trouble) {
            this.updateState({trouble: "fired"});
        }
    }

    handle_Q1_unpaid() {
        if (!this.state.trouble) {
            this.updateState({trouble: "unpaid"});
        }
    }


    renderQ1() {
        if (this.state.migrant === null || this.state.migrant === false) {
            return;
        }

        let firedButton = Tree.renderButton(
            this.state.trouble === "fired",
            () => this.handle_Q1_fired(),
            "My boss fired me"
        );
        let unpaidButton = Tree.renderButton(
            this.state.trouble === "unpaid",
            () => this.handle_Q1_unpaid(),
            "My boss has not paid my salary"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>What trouble are you facing at work?</h3>
                <div>
                    {firedButton}
                    {unpaidButton}
                </div>
            </Jumbotron>
        )
    }

    //////////////////////////////////////////
    // Q2
    //////////////////////////////////////////

    handleSalary() {
        if (!this.state.salary && this.state.temp_salary && this.state.temp_salary > 0) {
            this.updateState({
                salary: this.state.temp_salary,
                salary_disabled: true,
            });
        }
    }

    renderQ2() {
        if (this.state.trouble === null || this.state.trouble === "fired") {
            return;
        }

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>What is your salary?</h3>
                <Row className={"justify-content-center"}>
                    <Col xs={"12"} sm={"8"} md={"6"} lg={"4"} xl={"3"}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input disabled={this.state.salary_disabled} type="number" onChange={(evt) => {
                                this.updateState({temp_salary: evt.target.value});
                            }}/>
                            <InputGroupAddon addonType="append">
                                {Tree.renderButton(
                                    this.state.salary,
                                    () => this.handleSalary(),
                                    "OK!",
                                "0"
                                )}
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

    handleMonths() {
        if (!this.state.months && this.state.temp_months && this.state.temp_months > 0) {
            this.updateState({
                months: this.state.temp_months,
                months_disabled: true,
            });
        }
    }

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
                            <Input disabled={this.state.months_disabled} type="number" onChange={(evt) => {
                                this.updateState({temp_months: evt.target.value});
                            }}/>
                            <InputGroupAddon addonType="append">
                                {Tree.renderButton(
                                    this.state.months,
                                    () => this.handleMonths(),
                                    "OK!",
                                "0"
                                    )}
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
        if (this.state.working == null) {
            this.updateState({working: false});
        }
    }

    handle_Q4_working() {
        if (this.state.working === null) {
            this.updateState({working: true});
        }
    }


    renderQ4() {
        if (!this.state.months) {
            return;
        }

        let notWorkingButton = Tree.renderButton(
            this.state.working === false,
            () => this.handle_Q4_not_working(),
            "No"
        );
        let workingButton = Tree.renderButton(
            this.state.working === true,
            () => this.handle_Q4_working(),
            "Yes"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>Are you still working for your boss?</h3>
                <div>
                    {notWorkingButton}
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
                <JudgementDefault salary={this.state.salary} months={this.state.months} />
            )
        }
    }

    renderJudgementExpired() {
        if ((this.state.working === false && Number(this.state.months > 6))
            || (this.state.working === true && Number(this.state.months > 12))
        ) {
            return (
                <JudgementExpired />
            );
        }
    }


    ////////////////////////////////////////////////
    // Store state
    ////////////////////////////////////////////////

    uploadState() {
        if (
            this.state.uploaded === true
            || this.state.migrant === null
            || this.state.trouble === null
            || this.state.salary === null
            || this.state.months === null
            || this.state.working === null
        ) {
            return; // don't store incomplete data
        }

        const db = firestore.firestore();
        const userdata = db.collection("userdata").add({
            millis: Date.now(),
            migrant: this.state.migrant,
            trouble: this.state.trouble,
            salary: this.state.salary,
            months: this.state.months,
            working: this.state.working,
        });

        userdata.then(() => this.updateState({uploaded: true}));

        // userRef.then(() => {
        //     let temp = db.collection("tests").where("testdata", "==", "X").get();
        //     temp.then((res) => res.forEach((arg) => console.log(arg.data())));
        // });
    }


    ///////////////////////////////////////////////
    // Exceptions
    ///////////////////////////////////////////////

    renderNotMigrant() {
        if (this.state.migrant === false) {
            return (
                <Jumbotron style={{"margin": "0", "background-color": "#F0FFFF"}}>
                    <h1>We're sorry.</h1>
                    <p>Our platform currently focuses on helping migrant workers. Please come back later!</p>
                </Jumbotron>
            );
        }
    }

    renderFired() {
        if (this.state.trouble === "fired") {
            return (
                <Jumbotron style={{"margin": "0", "background-color": "#F0FFFF"}}>
                    <h1>We're sorry.</h1>
                    <p>Our platform currently focuses on helping people reclaim unpaid salary. Please come back
                        later!</p>
                </Jumbotron>
            );
        }
    }


    ////////////////////////////////////////////////
    // main
    ////////////////////////////////////////////////

    render() {

        return (
            <div>
                <Jumbotron style={{"background-color": "#ffeb64"}}>
                    <h1>Have you been treated unfairly at your workplace?</h1>
                    <p>We may be able to help you, if you answer a few short questions.</p>
                </Jumbotron>
                {this.renderQ0()}
                {this.renderQ1()}
                {this.renderQ2()}
                {this.renderQ3()}
                {this.renderQ4()}
                <div className={"mt-5"}/>
                {this.renderBottomRef()}
                {this.renderJudgmentDefault()}
                {this.renderJudgementExpired()}
                {this.renderNotMigrant()}
                {this.renderFired()}
                {this.scrollToBottom()}
            </div>
        );
    }
}

export default Tree;