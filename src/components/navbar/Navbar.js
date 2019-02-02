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
                <Navbar color="light" light expand="md">
                    <h3 href="/">Goko</h3>
                    <span className={"ml-4"}/>
                    <h5 className="sub-brand mb-0">bringing legal advice to the masses</h5>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Cases</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Know your options</NavLink>
                            </NavItem>
                            {/*<UncontrolledDropdown nav inNavbar>*/}
                                {/*<DropdownToggle nav caret>*/}
                                    {/*Options*/}
                                {/*</DropdownToggle>*/}
                                {/*<DropdownMenu right>*/}
                                    {/*<DropdownItem>*/}
                                        {/*Option 1*/}
                                    {/*</DropdownItem>*/}
                                    {/*<DropdownItem>*/}
                                        {/*Option 2*/}
                                    {/*</DropdownItem>*/}
                                    {/*<DropdownItem divider />*/}
                                    {/*<DropdownItem>*/}
                                        {/*Reset*/}
                                    {/*</DropdownItem>*/}
                                {/*</DropdownMenu>*/}
                            {/*</UncontrolledDropdown>*/}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;