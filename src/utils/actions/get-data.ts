import { redirect } from "next/navigation";

export async function getDataHome() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/objects/66c494e11c372de233c1773a?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`,
      { next: { revalidate: 120 } }
    );

    if (!res.ok) {
      throw new Error("falha do fetch data");
    }
    return res.json();
  } catch (err) {
    throw new Error("falha no fetch data");
  }
}

export async function getSubMenu() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&read_key=${process.env.READ_KEY}&depth=1&props=slug,title`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) {
      throw new Error("falha do fetch menu data");
    }
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch menu data");
  }
}

export async function getItemBySlug(itemSlug: string) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`;

  const queryParams = new URLSearchParams({
    query: JSON.stringify({
      slug: itemSlug,
    }),
    props: "slug,title,content,metadata",
    read_key: process.env.READ_KEY as string,
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 120 } });

    if (!res.ok) {
      throw new Error("falha do fetch menu data");
    }
    return res.json();
  } catch (err) {
    console.log("Failed get item data");
    redirect("/");
  }
}

// https://api.cosmicjs.com/v3/buckets/dev-motors-production-b0350a10-5ef1-11ef-9478-3f77cd4aa7a1/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&read_key=xxBqoVfVov3UILJp97tIFq0IobnUPou6SD21IABOVl7cLFg6QA&depth=1&props=slug,title,
