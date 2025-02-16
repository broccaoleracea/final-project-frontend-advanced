import React from "react";

const Card = ({ title, price, description }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        ${price}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>

      <div className="flex space-x-3">
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Learn More
        </a>

        <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800">
          Rent now
        </button>

        <button className="px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
