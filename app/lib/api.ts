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

export type NewsListResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: New[];
};

// news searching
export const getNews = async (page = 1, perPage = 6) => {
  const res = await api.get<NewsListResponse>("/news", {
    params: { page, perPage },
  });
  return res.data;
};

export const getNewsClient = async (page = 1, perPage = 6, query = "") => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (query) {
    params.set("query", query); // <-- это станет keyword на сервере
  }

  const res = await fetch(`/api/news?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch news");

  return res.json();
};

// our friends

export type workDays = {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
};

export type Friend = {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address?: string;
  workDays: workDays[] | null;
  phone?: number;
  email?: string;
};

export type FriendListResponse = {
  friends: Friend[];
  total: number;
};

export const getFriends = async (): Promise<Friend[]> => {
  const res = await api.get<Friend[]>("/friends");
  return res.data;
};

// notices

export type Notice = {
  _id: string;
  species: string;
  category: string;
  price?: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  imgURL: string;
  popularity: number;
  comment: string;
};

export type NoticeResponse = {
  results: Notice[];
  page: number;
  perPage: number;
  totalPages: number;
};

// export const getNotices = async (category?: string) => {
//   const res = await api.get<NoticeResponse>("/notices", {
//     params: category ? { category } : {},
//   });
//   return res.data;
// };

export const getNoticesClient = async (
  page = 1,
  perPage = 6,
  query = ""
): Promise<NoticeResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (query) params.set("query", query);

  const res = await fetch(`/api/notices?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch notices");

  return res.json();
};


// filter category

export type Category = "found" | "free" | "lost" | "sell";

export const getCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/notices/categories");
  return res.data;
};
