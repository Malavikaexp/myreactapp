import { useContext } from 'react'
import { CartContext } from '../context/Context'
import { Card, Button } from "react-bootstrap"
import Header from './header';

export default function Cart() {

    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext)

    return (
      <div className="cart">
        <div>
                <Header/>
            </div>
        <div>
            <h1>Cart Items</h1>
        </div>
        <div className='productContainer'>
                {cartItems.map((item) =>{
                    return(
                        <div className = "products">
                <Card>
                <Card.Img variant="top" src = {item.books} alt ={item.bookname} />
                <Card.Body>
                    <Card.Title>{item.bookname}</Card.Title>
                    <Button onClick={() => { addToCart(item)}}>
                        Add 
                    </Button>
                    <p> Qty: {item.quantity}</p>
                    <Button variant = 'danger' onClick={() => { removeFromCart(item)}}>
                        Remove
                    </Button>
                </Card.Body>
            </Card>
        </div>
                    ) 
                })

                }
            </div>
            {
    cartItems.length > 0 ? (
      <div className="flex flex-col justify-between items-center">
    <button
      className="px-4 py-2 bg-green-800 text-black text-xs font-bold uppercase rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
      onClick={() => {
        clearCart()
      }}
    >
      Clear cart
    </button>
  </div>
    ) : (
      <h1 className="text-lg font-bold">Your cart is empty</h1>
    )
  }
      </div>
    )
  }