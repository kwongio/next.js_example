import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number,
): Promise<BookData | null> {
  const url = `https://onebite-books-server-rust.vercel.app/book/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
