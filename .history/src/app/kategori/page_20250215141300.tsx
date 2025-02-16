import React from 'react';

export default function Kategori() {
  return (
    <div className="ml-64 p-4 min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <p className="text-xl font-bold text-center text-gray-900 dark:text-white">
        Halaman ini Kategori
      </p>
      <div className="mt-8 space-y-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} className="text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </p>
        ))}
      </div>
    </div>
  );
}