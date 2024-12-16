'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, {
            method: 'GET',
        });
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ",error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-4 mb-6">Our products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-green-300 font-bold">${product.price}</p>
            <Link href={`/products/${product._id}`}>
              <button className="align-center mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400">
                View details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}