'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Product deleted successfully");
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
            <p className="text-green-300 font-bold mb-1">${product.price}</p>
            <p className="text-yellow-400 font-bold">Stock: {product.stock}</p>
            <div className="mt-4 flex space-x-4">
              <Button text="Edit" className="bg-blue-500" onClick={() => router.push(`/admin/products/${product._id}/edit`)} />
              <Button text="Delete" className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(product._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}