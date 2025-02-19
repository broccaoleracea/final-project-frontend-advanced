"use client";
import { use } from "react"; // Import React.use
import UpdateView from "../update.view";

interface PageProps {
  params: Promise<{ id: string }>; // Params sekarang adalah Promise
}

const EditPage = ({ params }: PageProps) => {
  const { id } = use(params); // Gunakan React.use() untuk membongkar params

  return <UpdateView id={parseInt(id)} />;
};

export default EditPage;