import React from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/Persons";

export const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

export const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
