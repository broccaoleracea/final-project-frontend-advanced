import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  let token: string | undefined = undefined;
  async function getToken() {
    const cookie = await cookieStore.get("token");
    token = cookie ? cookie.value : null;
    return token;
  }

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/kategori`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
}
