import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Product} from '../../interfaces/product';

const SampleNavbar = (props: any) => {
    const {products} = props;
    console.log(products)
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Buildly Insights</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#releases">Releases</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Products" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.4">
                                    Active product
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                { products.length && products.map(
                                    (product: Product) => (
                                        <NavDropdown.Item
                                            key={product.product_uuid}
                                            href={product.product_uuid}
                                        >
                                            {product.name}
                                        </NavDropdown.Item>)
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Logged in User
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default SampleNavbar;
