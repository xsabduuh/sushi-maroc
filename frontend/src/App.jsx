import React, { useState } from 'react';

const App = () => {
    const [products, setProducts] = useState([]); // Replace with your products
    const [cart, setCart] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products
        .filter(product => categoryFilter ? product.category === categoryFilter : true)
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    return (
        <div>
            <h1>Product List</h1>
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <select onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                {/* Add your categories here */}
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
            </select>
            <ul>
                {filteredProducts.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;