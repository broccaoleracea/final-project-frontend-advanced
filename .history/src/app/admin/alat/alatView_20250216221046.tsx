"use client";

import { useState, useEffect } from "react";
import { useAlatGetQuery } from "@/state/api/dataApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAlat } from "@/state/api/data/alatSlice";

const AlatView = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const { data: alatResponse, isLoading, isError } = useAlatGetQuery();

  useEffect(() => {
    if (alatResponse) {
      console.log(alatResponse.data);
      dispatch(setAlat(alatResponse.data));
    }
  }, [alatResponse, dispatch]);

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

  const alat = alatResponse?.data || [];

  return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alat.length > 0 ? (
            alat.map((item) => (
                <div
                    key={item.alat_id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.alat_nama}
                  </h3>
                </div>
            ))
        ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              Tidak ada alat untuk ditampilkan.
            </div>
        )}

        {error && <div>{error}</div>}
      </div>
  );
};

export default AlatView;
