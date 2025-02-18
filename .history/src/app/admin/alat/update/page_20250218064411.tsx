// page.tsx
"use client";

import UpdateAlat from './UpdateAlat';

const Page = ({ params }: { params: { id: string } }) => {
  return <UpdateAlat params={params} />;
};

export default Page;