import { Notice } from "@/app/lib/api";

export type Pet = {
  _id: string;
  name: string;
  title?: string;
  imgURL?: string;
  species: string;
  birthday?: string;
  sex?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  email: string;
  name?: string;
  avatar?: string;
  phone?: string;
  token?: string;
  noticesViewed?: Notice[];
  noticesFavorites?: Notice[];
  pets?: Pet[];
  createdAt?: string;
  updatedAt?: string;
};
