import Header from './header';
import React, {useContext,useEffect,useState} from "react";
import axios from 'axios';
import { Card, Button } from "react-bootstrap"
import "./style.css";
import { CartContext } from '../context/Context';

const Cartlist = () => {

    const { cartItems, addToCart, removeFromCart } = useContext(CartContext)

    const [ProductList, setProductList] = useState([]);

    const fetchProducts = async () => {
        await axios.get(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorialBooks`)
        .then((response) => {
            setProductList(response.data);
        })
    }


    useEffect(() =>{
      fetchProducts();
    },[])


    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className='productContainer'>
                {ProductList.map((prod) =>{
                    return(
                        <div className = "products">
                <Card>
                <Card.Img variant="top" src = {prod.books} alt ={prod.bookname} />
                <Card.Body>
                    <Card.Title>{prod.bookname}</Card.Title>
                    {cartItems.some((p) => p.id === prod.id) ? (
                       <Button variant = 'danger' onClick={() => { removeFromCart(prod)}}>
                       Remove from cart
                   </Button> 
                    ): (
                        <Button onClick={() => addToCart(prod)} >
                        Add to cart
                    </Button>
                    )}
                </Card.Body>
            </Card>
        </div>

                    ) 
                })

                }
            </div>
        </div>
       
    )
};


export default Cartlist;