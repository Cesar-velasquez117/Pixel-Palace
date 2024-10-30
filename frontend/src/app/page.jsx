
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-4xl font-bold">Welcome to Pixel Palace</h2>
      <p className="mt-4 text-lg">Find your favorite games at the best price</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">Explore catalog</button>
    </div>
  );
}