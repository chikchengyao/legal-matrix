import React, {Component} from 'react';
import firestore from "../../firestore";
import Jumbotron from "reactstrap/es/Jumbotron";

class Trends extends Component {

    constructor(props) {
        super(props);


        this.state = {
            period: 3 * 24 * 3600 * 1000,

            workersLastPeriod: null,
            documentsLastPeriod: null,
        }
    }

    updateState(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    fetchData() {
        const db = firestore.firestore();

        let workers = db.collection("userdata")
            .where("millis", ">=", Date.now() - this.state.period)
            .get();

        workers.then((res) => {
            if (res.size !== this.state.workersLastPeriod) {
                this.updateState({workersLastPeriod: res.size});
            }
        });

        let documents = db.collection("letters")
            .where("millis", ">=", Date.now() - this.state.period)
            .get();

        documents.then((res) => {
            if (res.size !== this.state.documentsLastPeriod) {
                this.updateState({documentsLastPeriod: res.size});
            }
        });
    }

    render() {

        this.fetchData();

        return (
            <div>
                <Jumbotron style={{"background-color": "#4a5157"}}>
                    <h1 style={{"color": "#E0E1E7"}}>Trends</h1>
                    <p style={{"color": "#E0E1E7"}}>We use data trends to help you get your legal answer faster.</p>
                </Jumbotron>

                <Jumbotron style={{"background-color": "transparent", "textAlign": "left"}}>
                    Over the past 3 days, Goko has:
                    <ul>
                        <li>
                            assisted {this.state.workersLastPeriod} migrant
                            worker{this.state.workersLastPeriod > 1 ? "s" : undefined}
                        </li>
                        <li>
                            (artfully) generated {this.state.documentsLastPeriod} legal
                            document{this.state.documentsLastPeriod > 1 ? "s" : undefined}
                            </li>
                    </ul>
                </Jumbotron>
            </div>
        );
    }
}

export default Trends;