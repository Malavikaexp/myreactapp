import { Container, Navbar,  Badge} from "react-bootstrap";
import {FaShoppingCart } from 'react-icons/fa';
import {Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Context";

const Header = () =>{

    const {cartItems} = useContext(CartContext)
    
    return (
        <Navbar bg = "dark" variant="dark" style={{height : 60 , width : 1100}}>
        <Container>
              <Navbar.Brand>
                <Link to = {`/cartlist`}>Product List</Link>
              </Navbar.Brand>
        </Container>
        <Link to ={`/cart`}>
        <FaShoppingCart color ="white" fontSize="25px"/>
        <Badge>({cartItems.length})</Badge>
        </Link>
    </Navbar>
    ) 
};

export default Header;