export type UpdateAlatViewProps = {
    formData: FormDataType;
    error: string;
    successMessage: string;
    kategori: { id: string; kategori_nama: string }[];
    isUpdating: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export interface UpdateAlatProps  {
    params: {
        id: string;
    };
};

export interface FormDataType  {
    alat_nama: string;
    alat_deskripsi: string;
    alat_hargaPerhari: number;
    alat_stok: number;
    alat_kategori_id: string;
};