const BASE_URL = "https://billions-api.nomadcoders.workers.dev/";

export const getBillionaires = async () => {
  const res = await fetch(BASE_URL);
  const result = await res.json();
  return result;
};

export const getBillionaire = async (id: string) => {
  const res = await fetch(`${BASE_URL}/person/${id}`);
  const result = await res.json();
  return result;
};
