import React from "react";

const PenyewaanView = () => {
  const rentedItems = [

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Content */}
      <main className="w-full max-w-screen-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Barang yang Disewa</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentedItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-gray-700 font-medium">Durasi: {item.rentalPeriod}</p>
              <p className="text-gray-700 font-medium">Penyewa: {item.renter}</p>
              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                  item.status === "Sedang Disewa"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PenyewaanView;
