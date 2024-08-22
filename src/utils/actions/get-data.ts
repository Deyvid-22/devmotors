export async function getDataHome() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/objects/66c494e11c372de233c1773a?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`
    );
   
    if (!res.ok) {
      throw new Error("falha do fetch data")
    }
    return res.json();
  } catch (err) {
    throw new Error("falha no fetch data")
  }
}
