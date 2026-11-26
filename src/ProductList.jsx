import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
    {
        category: 'Air Purifying Plants',
        plants: [
            {
                name: 'Snake Plant',
                image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?w=400',
                description: 'Produces oxygen and purifies the air.',
                cost: '$15'
            },
            {
                name: 'Spider Plant',
                image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
                description: 'Removes harmful pollutants.',
                cost: '$12'
            }
        ]
    },
    {
        category: 'Aromatic Plants',
        plants: [
            {
                name: 'Lavender',
                image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400',
                description: 'Provides a calming fragrance.',
                cost: '$20'
            },
            {
                name: 'Rosemary',
                image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
                description: 'An aromatic and useful herb.',
                cost: '$18'
            }
        ]
    },
    {
        category: 'Indoor Plants',
        plants: [
            {
                name: 'Monstera',
                image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
                description: 'Beautiful tropical indoor plant.',
                cost: '$25'
            },
            {
                name: 'Aloe Vera',
                image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
                description: 'Easy to grow and maintain.',
                cost: '$10'
            }
        ]
    }
];

function ProductList() {
    const dispatch = useDispatch();

    const cartItems = useSelector(
        state => state.cart.items
    );

    const [showCart, setShowCart] = useState(false);

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity, 0
    );

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div className="product-list">

            <nav className="navbar">
                <h2>🌿 Paradise Nursery</h2>

                <button onClick={() => setShowCart(false)}>
                    Plants
                </button>

                <button onClick={() => setShowCart(true)}>
                    🛒 Cart ({totalQuantity})
                </button>
            </nav>

            {showCart ? (
                <CartItem
                    onContinueShopping={() => setShowCart(false)}
                />
            ) : (
                <div>
                    {plantsArray.map((group) => (
                        <section key={group.category}>

                            <h2>{group.category}</h2>

                            <div className="product-grid">

                                {group.plants.map((plant) => (
                                    <div
                                        className="product-card"
                                        key={plant.name}
                                    >
                                        <img
                                            src={plant.image}
                                            alt={plant.name}
                                        />

                                        <h3>{plant.name}</h3>

                                        <p>{plant.description}</p>

                                        <p>{plant.cost}</p>

                                        <button
                                            disabled={cartItems.some(
                                                item => item.name === plant.name
                                            )}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {cartItems.some(
                                                item => item.name === plant.name
                                            )
                                                ? 'Added to Cart'
                                                : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}

                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
