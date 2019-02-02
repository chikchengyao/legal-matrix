import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroupAddon, Input, InputGroup} from 'reactstrap';
import * as JsPDF from 'jspdf';
import firestore from "../../firestore";

class LetterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,

            uploaded: false,

            have_salary: this.props.salary !== undefined,
            have_months: this.props.months !== undefined,

            salary: this.props.salary,
            months: this.props.months,

            employee_name: null,

            employer_prefix: null,
            employer_name: null,
            employer_title: null,
            employer_address: null,
            employer_address_2: null,
            zipcode: null,
        };
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    toggle() {
        this.updateState({
            modal: !this.state.modal
        });
    }

    parseMonth(month_num) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month_num];
    }

    formatDate(raw_date) {
        return raw_date.getDate()
            + " "
            + this.parseMonth(raw_date.getMonth())
            + " "
            + raw_date.getFullYear();
    }


    ////////////////////////////////////////////////
    // Create letter
    ////////////////////////////////////////////////

    generateLetter() {

        let employee_name = this.state.employee_name;

        let employer_prefix = this.state.employer_prefix;
        let employer_name = this.state.employer_name;
        let employer_title = this.state.employer_title;
        let employer_address = this.state.employer_address;
        let employer_address_2 = this.state.employer_address_2;
        let zipcode = this.state.zipcode;

        let raw_date = new Date(Date.now());
        let raw_deadline = new Date(Date.now() + 2419200000);

        let today_date = this.formatDate(raw_date);


        let claim_amount = Number(
            Number(this.state.months) * Number(this.state.salary)
        ).toFixed(2); //format as 2dp
        let claim_months = this.state.months;
        let deadline = this.formatDate(raw_deadline);

        let doc = new JsPDF();
        doc.setFont("times");
        doc.setFontSize(12);

        doc.text(today_date, 20, 20);

        doc.text(employer_title, 20, 30);
        doc.text(employer_address, 20, 35);
        if (employer_address_2) {
            doc.text(employer_address_2, 20, 40);
            doc.text("Singapore " + zipcode, 20, 45);
        } else {
            doc.text("Singapore " + zipcode, 20, 40);
        }

        doc.text("Dear " + employer_prefix + " " + employer_name + ",", 20, 55);

        doc.setFontStyle("bold");
        doc.text("Request for Payment of Arrears in Salary", 65, 65);
        doc.line(65, 66, 141, 66);
        doc.setFontStyle("normal");

        doc.text("I have repeatedly requested payment of my long overdue salary in the amount of SGD" + claim_amount + ",", 20, 75);
        doc.text("that has accrued over the past " + claim_months + " months.", 20, 80);

        doc.text("In accordance with the Employment Act (Cap 91), you must pay my salary at least once a month", 20, 90);
        doc.text("and within 7 days after the end of the salary period.", 20, 95);

        doc.text("By not paying my salary in the amount of SGD" + claim_amount + ", you are in breach of Section 21(1) of the", 20, 105);
        doc.text("Employment Act.", 20, 110);

        doc.text("I reserve all rights herein, and unless I receive payment in full of this amount by " + deadline + ",", 20, 120);
        doc.text("I shall begin court proceedings against you. This will result in you being liable for legal fees and", 20, 125);
        doc.text("costs in addition to the amount above.", 20, 130);

        doc.text("Yours sincerely,", 20, 140);
        doc.text(employee_name, 20, 145);

        doc.save("Letter_of_Demand.pdf");

        const db = firestore.firestore();
        const userdata = db.collection("letters").add({
            raw_date,
            employee_name,
            employer_name,
            employer_title,
            employer_address,
            employer_address_2,
            zipcode,
            today_date,
            deadline,
            claim_amount,
            claim_months
        });

        userdata.then(() => this.updateState({uploaded: true}));
    }

    renderSalary() {
        if (!this.state.have_salary) {
            return (
                <InputGroup className={"mb-1"}>
                    <InputGroupAddon addonType="prepend">Monthly Salary (SGD)</InputGroupAddon>
                    <Input placeholder={"e.g. 1500.00"} onChange={(evt) => {
                        this.updateState({salary: evt.target.value});
                    }}/>
                </InputGroup>
            );
        }
    }

    renderMonths() {
        if (!this.state.have_months) {
            return (
                <InputGroup className={"mb-1"}>
                    <InputGroupAddon addonType="prepend">Months of Salary Owed</InputGroupAddon>
                    <Input placeholder={"e.g. 4"} onChange={(evt) => {
                        this.updateState({months: evt.target.value});
                    }}/>
                </InputGroup>
            );
        }
    }

    render() {
        return (
            <span>

                <span className="btn btn-link p-0 m-0 mb-1" onClick={() => this.toggle()}>Letter of Demand</span>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle()}>Letter of Demand</ModalHeader>
                    <ModalBody>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Your Name</InputGroupAddon>
                            <Input placeholder={"e.g. John Doe"} onChange={(evt) => {
                                this.updateState({employee_name: evt.target.value});
                            }}/>
                        </InputGroup>

                        {this.renderMonths()}
                        {this.renderSalary()}

                        <InputGroup className={"mt-4 mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Name Prefix</InputGroupAddon>
                            <Input placeholder={"e.g. Mr."} onChange={(evt) => {
                                this.updateState({employer_prefix: evt.target.value});
                            }}/>
                        </InputGroup>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Name</InputGroupAddon>
                            <Input placeholder={"e.g. Jane Doe"} onChange={(evt) => {
                                this.updateState({employer_name: evt.target.value});
                            }}/>
                        </InputGroup>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Title</InputGroupAddon>
                            <Input placeholder="e.g. Senior Manager" onChange={(evt) => {
                                this.updateState({employer_title: evt.target.value});
                            }}/>
                        </InputGroup>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Address (Line 1)</InputGroupAddon>
                            <Input placeholder={"e.g. Blk 123 Park Lane"} onChange={(evt) => {
                                this.updateState({employer_address: evt.target.value});
                            }}/>
                        </InputGroup>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Address (Line 2)</InputGroupAddon>
                            <Input placeholder={"e.g. #12-123"} onChange={(evt) => {
                                this.updateState({employer_address_2: evt.target.value});
                            }}/>
                        </InputGroup>
                        <InputGroup className={"mb-1"}>
                            <InputGroupAddon addonType="prepend">Employer's Zipcode</InputGroupAddon>
                            <Input placeholder={"e.g. 123456"} onChange={(evt) => {
                                this.updateState({zipcode: evt.target.value});
                            }}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>{' '}
                        <Button color="primary" onClick={() => {
                            this.generateLetter();
                            this.toggle();
                        }}>Generate</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default LetterModal;