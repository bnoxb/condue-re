import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import './style.css';

class Header extends Component {
    constructor(){
        super();

        this.state = {
            isOpen: false,
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
    render(){
        return(
            <div>
                <Navbar className="navbar-main" light expand="md">
                <NavbarBrand className="navbar-brand-link" tag={Link} to="/">Condue</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/menu">Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/reservation">Reservations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/patio">Patio Days</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="navbar-link" tag={Link} to="/about">About</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="navbar-link" nav caret>
                                Options
                                </DropdownToggle>
                                <DropdownMenu className="navbar-drop" right>
                                    <DropdownItem className="navbar-drop" tag={Link} to='/reviews'>
                                        Review Us
                                    </DropdownItem>
    
                                    <DropdownItem className="navbar-drop">
                                        Find Us
                                    </DropdownItem>
    
                                    <DropdownItem className="navbar-drop" divider />
    
                                    <DropdownItem className="navbar-drop" tag={Link} to='/adminlogin'>
                                        Admin Login
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
   
export default Header;