import React from "react";
import { useGetAlatQuery } from "./apiSlice"; // Impor hook dari RTK Query

const Card = ({ title, price, description }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-left flex items-center justify-between w-full">
      {/* Informasi Produk */}
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600 font-bold">${price}</p>
      </div>
      {/* Tombol Aksi */}
      <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">
        Rent Now
      </button>
    </div>
  );
};

const Home = () => {
  // Menggunakan useGetAlatQuery untuk mengambil data
  const { data, isLoading, isError } = useGetAlatQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="ml-64 bg-gray-100 min-h-screen flex justify-center overflow-x-auto">
      {/* Main Content */}
      <div className="p-8 text-left w-full max-w-none flex flex-col items-center">
        {/* Hero Section */}
        <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-black">
              Hello User!
            </h1>
            <p className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing industry.
            </p>
            <button className="mt-4 bg-black text-white font-bold py-2 px-6 rounded-lg shadow-md">
              Write new post
            </button>
          </div>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6 w-full">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">{ClipboardItem.}</h3>
            <p className="text-gray-600">Total Earning</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">13</h3>
            <p className="text-gray-600">Articles Request</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">03</h3>
            <p className="text-gray-600">Pending Articles</p>
          </div>
        </div>
        {/* Top Articles Section */}
        <h2 className="font-bold text-2xl mt-8 mb-4">THE PRODUCT</h2>
        <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md w-full">
          {data?.map((item) => (
            <Card
              key={item.id} // Pastikan setiap item memiliki ID unik
              title={item.alat_nama}
              price={item.hargaPerhari}
              description={item.ala}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;