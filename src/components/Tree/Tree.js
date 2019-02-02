import React, {Component, createRef} from 'react';
import {Row, Col, Button, Jumbotron, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import firestore from '../../firestore';
import LetterModal from "../LetterModal/LetterModal";

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


    static renderButton(active, callback, text, color = "secondary") {
        if (active) {
            return <Button className={"mb-1 mr-1"} color={color} onClick={callback}>{text}</Button>
        } else {
            return <Button className={"mb-1 mr-1"} outline color={color} onClick={callback}>{text}</Button>
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
            "No",
            "secondary"
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
            "My employer fired me"
        );
        let unpaidButton = Tree.renderButton(
            this.state.trouble === "unpaid",
            () => this.handle_Q1_unpaid(),
            "My employer has not paid my salary"
        );

        return (
            <Jumbotron className={this.jumbotron_dimen} style={{"background": "transparent"}}>
                <h3>What trouble are you facing at work?</h3>
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
                <h3>How many months of salary does your employer owe you?</h3>
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
                        <li>First, you should ask your employer for your salary if you have not already done so.</li>
                        <li>If that does not work, you can send him a <LetterModal
                            salary={this.state.salary}
                            months={this.state.months}

                        /> for your unpaid salary.
                        </li>
                        <li>
                            If your employer does not reply to your letter, you can force them to to meet you by <a
                            href="http://www.tadm.sg/eservices/employees-file-salary-claim/">filing this claim</a>. Your
                            employer will be fined if they do not come for the meeting.
                        </li>
                        <li>
                            Lastly, if the meeting is not successful, you can <a
                            href="https://www.statecourts.gov.sg/cws/ECT/Pages/An-Overview-of-the-Employment-Claims-Tribunals-(ECT).aspx">take
                            the case to court</a> where a judge will hear your claim.
                        </li>
                    </ul>
                </Jumbotron>
            )
        }
    }

    // renderJudgementSmallClaim() {
    //     let claim_amount = Number(this.state.months) * Number(this.state.salary);
    //
    //     if (claim_amount > 10000) {
    //         return;
    //     }
    //
    //     return (
    //         <div>
    //             <h4> Filing a claim </h4>
    //             <p>
    //                 Because your claim amount is less than $10000, you can file a claim with the Tripartite Alliance
    //                 for Dispute Management (TADM) for a fee of $10.
    //
    //                 Make an appointment to file a claim here: <a href="http://www.tadm.sg/eservices/employees-file-salary-claim/">
    //                     http://www.tadm.sg/eservices/employees-file-salary-claim/
    //                 </a>
    //             </p>
    //         </div>
    //     )
    // }

    renderJudgementExpired() {
        if ((this.state.working === false && Number(this.state.months > 6))
            || (this.state.working === true && Number(this.state.months > 12))
        ) {
            return (
                <Jumbotron style={{"text-align": "left"}}>
                    <h3>Sorry, your claim might have expired.</h3>
                    <p>
                        You might not be able to claim your salary under the Small Claims Tribunal. However, you&nbsp;
                        <i>should</i> still seek professional legal advice on how to proceed.
                    </p>

                    <p>Here is a list of affordable law firms that can help you:</p>

                    <ul>
                        <li>
                            asdf
                        </li>
                        <li>
                            qwer
                        </li>
                    </ul>


                    <p>
                        PLACEHOLDER Show a list of law firms that deal with small claims + provide free first-time
                        consultatations. Show office contact numbers
                    </p>

                    <p>
                        If cost is an issue, there are legal clinics that can offer free legal advice. These are the clinics closest to your location:
                    </p>

                    <iframe title="legal-clinics"
                            src="https://www.google.com/maps/d/u/0/embed?mid=1uzAKQTrl50sPPmn0XL3lU-yOBct5ei4a"
                            width="100%" height="480"/>

                </Jumbotron>
            )
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
                <Jumbotron>
                    <h1>We're sorry.</h1>
                    <p>Our platform currently focuses on helping migrant workers. Please come back later!</p>
                </Jumbotron>
            );
        }
    }

    renderFired() {
        if (this.state.trouble === "fired") {
            return (
                <Jumbotron>
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
                <Jumbotron>
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