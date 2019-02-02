import React, {Component} from 'react';
import {Jumbotron} from "reactstrap";
import LetterModal from "../LetterModal/LetterModal";

class JudgementDefault extends Component {
    constructor(props) {
        super(props);

        this.state = {
            salary: this.props.salary,
            months: this.props.months,
        }
    }

    render(salary = this.state.salary) {
        return (
            <Jumbotron style={{"textAlign": "left", "margin": "0"}}>
                <h3>Good news!</h3>
                <p>
                    You can most likely claim the unpaid salary payments from your employer.
                </p>
                <ul>
                    <li>First, you should ask your employer for your salary if you have not already done so.</li>
                    <li>
                        If that does not work, you can send him a <LetterModal
                        salary={salary}
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

                <p>
                    Click <a className={"btn btn-link m-0 p-0 mb-1"} href={"/claim"}> here </a> for a permanent link to
                    this page.
                </p>
            </Jumbotron>
        );
    }
}

export default JudgementDefault;