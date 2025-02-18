// page.tsx
"use client";

import UpdateAlat from "./update.view";


const UpdatePage = ({ params }: { params: { id: string } }) => {
  return <UpdateAlat params={params} />;
};

export default Page;