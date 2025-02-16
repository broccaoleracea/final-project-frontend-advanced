import React from 'react';

interface KategoriViewProps {
  mode: 'kategori' | 'barang';
  selectedKategori: string;
  barang: Array<{ id: number; nama: string; kategori: string; tersedia: boolean }>;
  onKategoriClick: (kategori: string) => void;
  onBackToKategori: () => void;
}

const KategoriView: React.FC<KategoriViewProps> = ({
  mode,
  selectedKategori,
  barang,
  onKategoriClick,
  onBackToKategori,
}) => {
  return (
    <div className="ml-64 p-4 min-h-screen bg-gray-100 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-yellow-400 w-full py-10 px-6 rounded-xl shadow-lg mb-8 text-center mt-10 mb-10">
        <h1 className="text-3xl font-extrabold text-black">Selamat Datang di Halaman Kategori</h1>
        <p className="text-gray-700 mt-2">
          Temukan barang elektronik berdasarkan kategori favorit Anda.
        </p>
      </div>

      {/* Tombol Kembali (jika dalam mode barang) */}
      {mode === 'barang' && (
        <button
          onClick={onBackToKategori}
          className="flex items-center justify-center w-full md:w-auto px-6 py-2 mb-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Kategori
        </button>
      )}

      {/* Tampilan Kategori */}
      {mode === 'kategori' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['pencahayaan', 'pendingin ruangan', 'kamera', 'handphone', 'laptop'].map((kategori) => (
            <div
              key={kategori}
              onClick={() => onKategoriClick(kategori)}
              className="p-4 rounded-lg shadow-sm border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-black">{kategori.charAt(0).toUpperCase() + kategori.slice(1)}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Tampilan Barang */}
      {mode === 'barang' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barang.length > 0 ? (
            barang.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg shadow-sm border border-gray-200 ${
                  item.tersedia ? 'bg-gray-50' : 'bg-gray-200 cursor-not-allowed'
                }`}
              >
                <h3 className="text-lg font-semibold text-black">{item.nama}</h3>
                <p className="text-sm text-gray-600">Kategori: {item.kategori}</p>
                <p
                  className={`text-sm font-medium ${
                    item.tersedia ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.tersedia ? 'Tersedia' : 'Tidak Tersedia'}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Tidak ada barang dalam kategori ini.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default KategoriView;