import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

const NavigationComponent = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Scrum Sprints</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Account" id="account-dropdown">
                        <NavDropdown.Item as={Link} to="/edit-account">Edit Account</NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={() => props.setLogOut(true)}>Sign Out</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={props.archiveAccount}>Archive Account</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" onClick={() => props.setLogOut(true)}>Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationComponent