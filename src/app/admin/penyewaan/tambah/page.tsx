import React from 'react';
import PenyewaanView from "@/app/admin/penyewaan/penyewaan.view";
import {usePenyewaanGetQuery} from "@/state/api/dataApi";

function Page() {
    const { data: penyewaanResponse, isLoading, isError } = usePenyewaanGetQuery();
    return (
        <PenyewaanView />
    );
}

export default Page;