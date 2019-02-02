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
                    <NavbarBrand href="/" style={{"color": "white"}}><h3 ref="/">Goko</h3></NavbarBrand>
                    <h6 className="sub-brand mb-0">every payslip counts</h6>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/options">Know Your Options</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/cases">Past Cases</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={"/aboutus"}>About Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;