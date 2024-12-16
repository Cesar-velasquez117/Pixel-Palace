'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function EditProductPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          stock: data.stock,
          image: data.image,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload the image to Cloudinary
    const formDataImage = new FormData();
    formDataImage.append('file', formData.image);
    formDataImage.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    console.log("Setting formData to upload it to Cloudinary");
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formDataImage,
      });
      console.log("Image uploaded to Cloudinary successfully");

      const data = await res.json();
      const imageUrl = data.secure_url;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, image: imageUrl}),
      });

      if (response.ok) {
        alert("Product updated successfully");
        router.push("/admin/products");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-4 mb-6">Edit Product</h1>
      <form className="w-full max-w-md bg-gray-800 p-6 rounded-lg" onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded"/>
        <InputField label="Description" type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded"/>
        <InputField label="Category" type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded"/>
        <InputField label="Price" type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded"/>
        <InputField label="Stock" type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded"/>
        <div className="mb-4">
          <label className="block text-green-300 text-sm font-bold mb-2">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <Button type="submit" text="Save changes" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" />
      </form>
    </div>
  )
}