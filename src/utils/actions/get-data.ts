export async function getDataHome() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}-b0350a10-5ef1-11ef-9478-3f77cd4aa7a1/objects/66c494e11c372de233c1773a?read_key=${process.env.READ_KEY}&props=slug,title,metadata,`
    );

    if (!res.ok) {
      throw new Error("falha no featch  data");
    }
    return res.json();
  } catch (err) {
    throw new Error("Failed to featch data");
  }
}
