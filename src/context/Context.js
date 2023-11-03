import { createContext, useState} from "react";

export const CartContext = createContext(null);



export const CartProvider = ({children }) =>{

    const [cartItems, setCartItems] = useState([]);

    const addToCart =(item) =>{
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem

                )
            );
        } else{
            setCartItems([...cartItems, {...item,quantity:1}]);
        }
    };

    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        if(isItemInCart.quantity === 1){
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        } else{
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]); 
    };

       console.log(cartItems);

    return (
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
          }}
        >
          {children}
        </CartContext.Provider>
      );



}