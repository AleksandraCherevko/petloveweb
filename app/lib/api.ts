import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

// news

export type New = {
  _id: number;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
};

export type NewsListResponse = { news: New[]; total: number };
export const getNews = async () => {
  const res = await api.get<NewsListResponse>("/news");
  return res.data;
};
