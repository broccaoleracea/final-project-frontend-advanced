import React from "react";

const Card = ({ title, price, description }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-left">
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-600 font-bold">${price}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] text-white p-6 h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6">ZP Articles</h2>
        <ul className="space-y-4">
          <li className="p-3 bg-[#FECACA] text-black rounded-lg">Dashboard</li>
          <li className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">My Articles</li>
          <li className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">Analytics</li>
          <li className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">Inbox</li>
          <li className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">Earnings</li>
          <li className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 text-left">
        {/* Hero Section */}
        <div className="bg-yellow-400 w-full max-w-5xl py-10 px-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-black">Hello Sarah!</h1>
            <p className="text-gray-700">Lorem Ipsum is simply dummy text of the printing industry.</p>
            <button className="mt-4 bg-black text-white font-bold py-2 px-6 rounded-lg shadow-md">Write new post</button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">$623</h3>
            <p className="text-gray-600">Total Earning</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">13</h3>
            <p className="text-gray-600">Articles Request</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">03</h3>
            <p className="text-gray-600">Pending Articles</p>
          </div>
        </div>

        {/* Top Articles Section */}
        <h2 className="font-bold text-2xl mt-8 mb-4">Top Articles</h2>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <Card title="Disney’s motion principles" price="19.99" description="An insightful article on Disney's animation techniques." />
          <Card title="Airbnb landing page design" price="25.50" description="A detailed breakdown of Airbnb’s UX strategies." />
          <Card title="Tech innovations" price="30.00" description="Exploring the latest advancements in technology." />
        </div>
      </div>
    </div>
  );
};

export default Home;
