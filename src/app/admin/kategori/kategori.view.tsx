"use client";

import { useState, useEffect } from "react";
import { useKategoriGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setKategori } from "@/state/api/data/kategoriSlice";

const KategoriView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const { data: kategoriResponse, isLoading, isError } = useKategoriGetQuery();

  useEffect(() => {
    if (kategoriResponse) {
      dispatch(setKategori(kategoriResponse.data));
    }
  }, [kategoriResponse, dispatch]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => "Loading...")}
      </div>
    );
  }

  if (isError) {
    return "Gagal memuat!";
  }

  const kategori = kategoriResponse?.data || [];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kategori.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-lg font-medium text-gray-900">
            {item.kategori_nama}
          </h3>
        </div>
      ))}

      {kategori.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No categories found.
        </div>
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default KategoriView;
