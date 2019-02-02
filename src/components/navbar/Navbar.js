import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import "./Navbar.css"
import NavbarBrand from "reactstrap/es/NavbarBrand";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <span className={"ml-3"}/>
                    <NavbarBrand style={{"color": "white"}}><h3 ref="/">Goko</h3></NavbarBrand>
                    <span className={"ml-2"}/>
                    <h6 className="sub-brand mb-0">bringing legal advice to the masses</h6>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>Cases</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/options">Know your options</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;