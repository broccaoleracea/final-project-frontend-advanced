import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";
import { useAlatGetQuery } from "@/state/api/dataApi";
import React, { useEffect } from "react";

const KategoriView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: kategoriResponse, isLoading, isError } = useAlatGetQuery();

  useEffect(() => {
    if (kategoriResponse) {
      dispatch(setAlat(kategoriResponse.data));
    }
  }, [kategoriResponse, dispatch]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat kategori. Silakan coba lagi nanti.
      </div>
    );
  }
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
  return (
    <div className=" ml-64 bg-gray-100 min-h-screen flex justify-center overflow-x-auto">
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
            <h3 className="text-xl font-bold">{item.alat_const KategoriView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { data: kategoriResponse, isLoading, isError } = useKategoriGetQuery();

  useEffect(() => {
    if (kategoriResponse) {
      dispatch(setKategori(kategoriResponse.data));
    }
  }, [kategoriResponse, dispatch]);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center py-8">
        Gagal memuat kategori. Silakan coba lagi nanti.
      </div>
    );
  }}</h3>
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
          <Card
            title="Disney’s motion principles"
            price="19.99"
            description="An insightful article on Disney's animation techniques."
          />
          <Card
            title="Airbnb landing page design"
            price="25.50"
            description="A detailed breakdown of Airbnb’s UX strategies."
          />
          <Card
            title="Tech innovations"
            price="30.00"
            description="Exploring the latest advancements in technology."
          />
          <Card
            title="New AI Trends"
            price="35.00"
            description="A look into the future of artificial intelligence."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
