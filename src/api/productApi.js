const BASE_URL = "https://fakestoreapi.com";

export const getApiUrl = (path = "") => `${BASE_URL}/products${path}`;

export const getAllProducts = async () => {
  const request = new Request(getApiUrl(), {
    method: "GET",
  });

  const res = await fetch(request);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (id) => {
  const request = new Request(getApiUrl(`/${id}`), {
    method: "GET",
  });

  const res = await fetch(request);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const addProduct = async (productData) => {
  const request = new Request(getApiUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  const res = await fetch(request);
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const request = new Request(getApiUrl(`/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  const res = await fetch(request);
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

export const deleteProduct = async (id) => {
  const request = new Request(getApiUrl(`/${id}`), {
    method: "DELETE",
  });

  const res = await fetch(request);
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};