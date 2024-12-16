'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/Button";

export default function ProductDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
          method: 'GET',
        });
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details: ", error);
        router.push("/products");
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full max-w-md h-auto rounded-lg mb-6" />
      <p className="text-green-300 text-lg font-bold mb-2">${product.price}</p>
      <p className="text-gray-300 mb-4 mx-8 text-center">{product.description}</p>
      <p className="text-gray-400">Category: {product.category}</p>
      <p className="text-gray-400">Stock: {product.stock}</p>
      <Button text="Back to Products" className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400 mb-4" onClick={() => router.push("/products")} />
    </div>
  );
}