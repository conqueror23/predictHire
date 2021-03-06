import axios from "axios";

interface UrlConfig {
  [key: string]: string;
  COMPANY: string;
  USER: string;
  VACANT: string;
}

// these config can be read from envs for future uses
const BASE_URLS: UrlConfig = {
  COMPANY: "http://localhost:3001",
  USER: "http://localhost:3002",
  VACANT: "http://localhost:3003",
};

interface RequestsConfig {
  [key: string]: string;
  FINDALL: string;
  FIND: string;
  CREATE: string;
  UPDATE: string;
  DELETE: string;
}

const REQUESTS: RequestsConfig = {
  FINDALL: "/findALL",
  FIND: "/find",
  CREATE: "/createDocument",
  UPDATE: "/updateById",
  DELETE: "/deleteById",
};

// we might want to standardise the code returning process
// return the code directly from backend may keep the proces simple f

const fetchAll = async (dataSource: string) => {
  const response = await axios.get(BASE_URLS[dataSource] + REQUESTS.FINDALL);
  const message = await response.data.message;
  return message;
};

const findDoc = async (dataSource: string, params: string) => {
  const response = await axios.get(
    BASE_URLS[dataSource] + REQUESTS.FIND + `${params}`
  );
  const message = await response.data;
  return message;
};

const createOne = async (dataSource: string, documentContext: Object) => {
  const response = await axios.post(
    BASE_URLS[dataSource] + REQUESTS.CREATE,
    documentContext
  );
  const message = await response.data;
  return message;
};

const upsertDoc = async (dataSource: string, documentContext: Object) => {
  const response = await axios.put(
    BASE_URLS[dataSource] + REQUESTS.UPDATE,
    documentContext
  );
  const message = await response.data;
  return message;
};

const deleteDoc = async (dataSource: string, documentContext: Object) => {
  const response = await axios.delete(BASE_URLS[dataSource] + REQUESTS.DELETE, {
    data: documentContext,
  });
  const data = await response.data;
  return data;
};

export { fetchAll, findDoc, createOne, upsertDoc, deleteDoc };
