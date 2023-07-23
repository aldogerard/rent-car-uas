import axios from "axios";

export const getDataUsers = async (id = "") => {
  const res = await axios.get(`https://api-rent-car.vercel.app/users/${id}`);
  const data = res.data.data;
  return data;
};

export const getDataCars = async () => {
  const res = await axios.get("https://api-rent-car.vercel.app/product");
  const data = res.data.data;
  return data;
};

export const getDataCarsById = async (id) => {
  const res = await axios.get(`https://api-rent-car.vercel.app/product/${id}`);
  const data = res.data.data;
  return data;
};

export const getDataOrder = async () => {
  const res = await axios.get("https://api-rent-car.vercel.app/order");
  const data = res.data.data;
  return data;
};

export const getDataMessage = async () => {
  const res = await axios.get("https://api-rent-car.vercel.app/message");
  const data = res.data.data;
  return data;
};

export const addProduct = async (formData) => {
  const res = await axios.post(`http://localhost:3000/product`, formData);
  const data = res.data;
  return data;
};

export const updateProduct = async (id, formData) => {
  const res = await axios.patch(`http://localhost:3000/product/${id}`, formData);
  const data = res.data;
  return data;
};
