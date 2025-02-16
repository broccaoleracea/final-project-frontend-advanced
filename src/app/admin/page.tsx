import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  // const data = await fetch('your-api/dashboard-data', {
  //     headers: {
  //         Authorization: `Bearer ${token.value}`
  //     }
  // })
  // const initialData = await data.json()
  const initialData = JSON;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <DashboardClient initialData={initialData} /> */}
    </div>
  );
}
