'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Upload the image to Cloudinary
    const formDataImage = new FormData();
    formDataImage.append('file', formData.image);
    formDataImage.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formDataImage,
      });

      const data = await res.json();
      const imgeUrl = data.secure_url;

      // Save the product details to the database
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imgeUrl,
        }),
      });

      if (response.ok) {
        setMessage('Product created successfully');
        setIsSuccess(true);
        router.push('/admin/products');
      } else {
        setMessage('Failed to create product');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Create a product</h2>
      <form
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <InputField label="Name" type="text" name="name" placeholder="Enter the product name" value={formData.name} onChange={handleChange} />
        <InputField label="Description" type="text" name="description" placeholder="Enter the product description" value={formData.description} onChange={handleChange} />
        <InputField label="Category" type="text" name="category" placeholder="Enter the product category" value={formData.category} onChange={handleChange} />
        <InputField label="Price" type="number" name="price" placeholder="Enter the product price" value={formData.price} onChange={handleChange} />
        <InputField label="Stock" type="number" name="stock" placeholder="Enter the product stock" value={formData.stock} onChange={handleChange} />
        <div className="mb-4">
          <label className="block text-green-300 text-sm font-bold mb-2">Image</label>
          <inpuy type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <Button text={uploading ? 'Uploading...' : 'Create product'} className="w-full mt-4" />
      </form>
      {message && <p className={`mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>{message}</p>}
    </div>
  )
}
