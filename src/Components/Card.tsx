import React from 'react';

const Card = ({ title, date, views, likes, comments }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* Header */}
      <div className="p-5">
        <h4 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title || "Judul Tidak Tersedia"}
        </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {date || "Tanggal Tidak Tersedia"}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <span className="flex items-center text-gray-600 dark:text-gray-400">
            👁️ {views || "0"}
          </span>
          <span className="flex items-center text-gray-600 dark:text-gray-400">
            ❤️ {likes || "0"}
          </span>
          <span className="flex items-center text-gray-600 dark:text-gray-400">
            💬 {comments || "0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;