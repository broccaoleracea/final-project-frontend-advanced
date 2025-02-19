"use client"
import {useCallback, useMemo, useState} from "react";
import RentalView from "./penyewaan.view";
import Popup from "@/app/portal/page";
import {
    usePenyewaanGetQuery,
    usePenyewaanDeleteMutation,
    usePelangganGetQuery,
    useAlatGetQuery,
    usePenyewaanDetailGetQuery,
} from "@/state/api/dataApi";
import FullPageSpinner from "@/Components/Spinner/FullPageSpinner";

const RentalPage = () => {
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [penyewaanIdToDelete, setPenyewaanIdToDelete] = useState<number | null>(null);

    // Fetch data
    const { data: penyewaanResponse, isLoading: isPenyewaanLoading, isError: isPenyewaanError, refetch: refetchPenyewaan } = usePenyewaanGetQuery();
    const { data: pelangganResponse, isLoading: isPelangganLoading, isError: isPelangganError } = usePelangganGetQuery();
    const { data: alatResponse, isLoading: isAlatLoading, isError: isAlatError } = useAlatGetQuery();
    const { data: penyewaanDetailResponse } = usePenyewaanDetailGetQuery();
    const [deletePenyewaan, { isLoading: isDeleting }] = usePenyewaanDeleteMutation();

    // Handle deletion
    const handleDelete = async () => {
        if (penyewaanIdToDelete === null) return;

        try {
            await deletePenyewaan(penyewaanIdToDelete).unwrap();
            refetchPenyewaan();
            setShowPopup(false);
        } catch (err: any) {
            setError(err?.data?.message || "Gagal menghapus penyewaan.");
        }
    };
    const showConfirmationPopup = useCallback((id: number) => {
        setPenyewaanIdToDelete(id);
        setShowPopup(true);
    }, []);
    // Group penyewaan details by penyewaan_id
    const penyewaanDetailMap = useMemo(() => {
        if (!penyewaanDetailResponse?.data) return new Map(); // Handle undefined case

        const map = new Map();
        penyewaanDetailResponse.data.forEach((detail) => {
            const key = Number(detail.penyewaan_detail_penyewaan_id); // Use the correct key
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key).push(detail);
        });

        console.log("penyewaanDetailMap:", map); // Debugging log
        return map;
    }, [penyewaanDetailResponse]);


    // Convert fetched data to maps for quick lookup
    const pelangganMap = useMemo(
        () => new Map(pelangganResponse?.data?.map((p) => [p.pelanggan_id, p])),
        [pelangganResponse]
    );

    const alatMap = useMemo(
        () => new Map(alatResponse?.data?.map((a) => [a.alat_id, a])),
        [alatResponse]
    );

    // Derived data for table display
    const rentedItems = penyewaanResponse?.data || [];

    // Error and Loading states
    if (isPenyewaanLoading || isPelangganLoading || isAlatLoading) return <FullPageSpinner />;
    if (isPenyewaanError || isPelangganError || isAlatError) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center"><div className="text-red-600 text-lg font-semibold">Gagal memuat data!</div></div>;
    }   
  

    return (
        <RentalView
            rentedItems={rentedItems}
            pelangganMap={pelangganMap}
            alatMap={alatMap}
            penyewaanDetailMap={penyewaanDetailMap}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            showConfirmationPopup={showConfirmationPopup}
            handleDelete={handleDelete}
        />
    );
};

export default RentalPage;
