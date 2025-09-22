// @ts-nocheck
// Lightweight API helper
import { message } from "antd";

export const BASE_URL = "https://childcraft-server.onrender.com";

export const API = {
  BASE: "",
  BOOKS: "/books",
  ALL_BOOKS: "/allbooks",
};

const buildUrl = (endpoint: string, query?: Record<string, any>) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};

export const GET = async (endpoint: string, query?: Record<string, any>) => {
  const url = buildUrl(endpoint, query);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
};

export const POST = async (
  endpoint: string,
  body?: Record<string, any> | FormData,
  query?: Record<string, any>
) => {
  const url = buildUrl(endpoint, query);
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const res = await fetch(url, {
    method: "POST",
    headers: isFormData
      ? { Accept: "application/json" }
      : { "Content-Type": "application/json", Accept: "application/json" },
    body: isFormData ? (body as FormData) : JSON.stringify(body || {}),
  });
  if (res.status === 400) {
    const text = await res.text();
    message.error(text || "Bad Request");
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json();
};

export default {
  BASE_URL,
  API,
  GET,
  POST,
};


