import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {

    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total +
                parseFloat(item.cost.replace('$', '')) * item.quantity;
        }, 0).toFixed(2);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity, 0
        );
    };

    const calculateTotalCost = (item) => {
        return (
            parseFloat(item.cost.replace('$', '')) * item.quantity
        ).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckout = () => {
        alert('Coming Soon');
    };

    return (
        <div className="cart-container">

            <h1>Shopping Cart</h1>

            <h2>
                Total Cart Items: {calculateTotalQuantity()}
            </h2>

            <h2>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {cartItems.length === 0 && (
                <p>Your shopping cart is empty.</p>
            )}

            {cartItems.map((item) => (
                <div className="cart-item" key={item.name}>

                    <img
                        src={item.image}
                        alt={item.name}
                        width="120"
                    />

                    <div className="cart-item-details">

                        <h3>{item.name}</h3>

                        <p>Unit Price: {item.cost}</p>

                        <div className="cart-item-quantity">

                            <button
                                onClick={() => handleDecrement(item)}
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() => handleIncrement(item)}
                            >
                                +
                            </button>

                        </div>

                        <p>
                            Total: ${calculateTotalCost(item)}
                        </p>

                        <button
                            onClick={() => handleRemove(item)}
                        >
                            Delete
                        </button>

                    </div>
                </div>
            ))}

            <button onClick={onContinueShopping}>
                Continue Shopping
            </button>

            <button onClick={handleCheckout}>
                Checkout
            </button>

        </div>
    );
}

export default CartItem;
