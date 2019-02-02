import React, {Component} from 'react';
import {Jumbotron} from "reactstrap";
import Button from "reactstrap/es/Button";
import Collapse from "reactstrap/es/Collapse";

class JudgementExpired extends Component {
    constructor(props) {
        super(props);
        this.state = {collapse: false};
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <Jumbotron style={{"textAlign": "left", "margin": "0"}}>
                <h3>Sorry, your claim might have expired.</h3>
                <p>
                    You might not be able to claim your salary under the Small Claims Tribunal. However, you&nbsp;
                    <i>should</i> still seek professional legal advice on how to proceed.
                </p>

                <p>Here is a list of affordable law firms that can help you:</p>

                <ul>
                    <li>
                        <b>Gloria James-Civetta & Co</b> <br/>
                        3 Church Street, #15-04 Samsung Hub, 049483 <br/>
                        (Tel) 6337 0469
                    </li>
                    <li>
                        <b>HJM Asia Law & Co LLC</b> <br/>
                        1 Orchard Rd, Singapore 238874 <br/>
                        (Tel) 6755 9019
                    </li>
                    <li>
                        <b>LAW ASIA International Lawyers</b> <br/>
                        111 North Bridge Rd, Peninsula Plaza Singapore 179098 <br/>
                        (Tel) 6337 7500
                    </li>
                    <li>
                        <b>WMH Law corporation</b> <br/>
                        12 Eu Tong Sen Street, #07-169, Singapore 059819 <br/>
                        (Tel) 6514 6350
                    </li>
                </ul>

                <p>
                    If cost is still an issue, there are legal clinics that can offer legal advice completely free of
                    charge. These are the
                    clinics closest to your location:
                </p>

                <Button color={"secondary"} onClick={() => this.toggle()}>Show Legal Clinics</Button>
                <Collapse isOpen={this.state.collapse}>
                    <iframe title="legal-clinics"
                            src="https://www.google.com/maps/d/u/0/embed?mid=1uzAKQTrl50sPPmn0XL3lU-yOBct5ei4a"
                            width="100%" height="480"/>
                </Collapse>

                <p></p>

                <p>
                    Click <a className={"btn btn-link m-0 p-0 mb-1"} href={"/expired"}> here </a> for a permanent link to this page.
                </p>
            </Jumbotron>
        );
    }
}

export default JudgementExpired;