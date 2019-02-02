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
                    <h3><b>KJS v LHLA</b></h3>
                    <h5>Facts:</h5>
                    <p>
                        The employer ended their worker's employment contract without notice and without paying them, even though the
                        contract indicated that the employer needs to give 2 weeks’ notice for termination. This termination was therefore
                        in breach of Section 13(1) of the Employment Act.

                        The worker was afraid of being sent back to their country after his employment contract ended, and therefore
                        did not insist on staying to serve out the notice of their employment. The worker was afraid that arguing with
                        their employer would bring attention to their unemployment status.
                    </p>
                    <h5>Important Rulings:</h5>
                    <ul>
                        <li> The court ruled that if the employer does not give notice, they then need to compensate workers in lieu of notice, for termination without cause. </li>
                        <li>The court also ruled that all court fees would be paid by the employer, because they lost the case.</li>
                    </ul>
                </Jumbotron>
            </div>
        );
    }
}

export default Cases;