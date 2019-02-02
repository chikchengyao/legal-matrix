import React, {Component} from 'react';
import Jumbotron from "reactstrap/es/Jumbotron";
import './Cases.css';

class Cases extends Component {
    render() {
        return (
            <div>
                <Jumbotron className={"m-0"}>
                    <h1>Past cases</h1>
                    <p>If you are treated unfairly, you have a case. Here are some previous cases where people have gone
                        to court.</p>
                </Jumbotron>
                <Jumbotron className={"ml-5 mr-5"} style={{"background": "transparent", "text-align": "left"}}>
                    <h3>KJS v LHLA</h3>
                    <h5>Facts:</h5>
                    <p>
                        Employer ended their employment contract without notice without paying them. Their employment
                        contract indicated that the employer needs to give 2 weeks’ notice. This is in breach of s13(1)
                        of the Employment act.

                        Worker was afraid of being sent back to their country after employment contract ended, therefore
                        did not insist on staying to serve out the notice of their employment. Worker was afraid that it
                        would bring attention to their employment status if they argued with their employer
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Cases;