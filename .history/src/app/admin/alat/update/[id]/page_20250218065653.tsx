"use client";
import UpdateAlat from "@/components/UpdateAlat"; // Sesuaikan path jika perlu

const UpdatePage = ({ params }: { params: { id: string } }) => {
  return <UpdateAlat params={params} />;
};

export default UpdatePage;