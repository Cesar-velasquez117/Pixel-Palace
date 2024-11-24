'use client';
import { useState, useEffect } from "react";

export default function Catalog(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = async (productId) => {
    await fetch('/api/cart/<USER_ID>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
    });
    alert('Product added to cart!');
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <h2 className="text-xl">{product.name}</h2>
          <p className="tex-gray-500">{product.description}</p>
          <p className="text-green-500">${product.price}</p>
          <button
            className="bg-blue-500 text-white py-1 px-4 mt-2"
            onClick={() => addToCart(product._id)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}