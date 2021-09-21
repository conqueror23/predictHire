import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { dialogTitleClasses } from "@mui/material";
import axios from "axios";
import config from "next/config";


interface UrlConfig{
    [key:string]:string
    COMPANY:string,
    USER:string,
    VACANT:string
}

const BASE_URLS:UrlConfig={
    COMPANY:"http://localhost:3001",
    USER:"http://localhost:3002",
    VACANT:"http://localhost:3003"
}

interface RequestsConfig {
    [key:string]:string
    FINDALL:string
    FIND:string,
    CREATE:string,
    UPDATE:string,
    DELETE:string,
}

const REQUESTS:RequestsConfig={
    FINDALL:"/findALL",
    FIND:"/find",
    CREATE:"/createDocument",
    UPDATE:"/updateById",
    DELETE:"/deleteById",
}

interface RequestParams {
  url: string;
  method: string;
}

// we might want to standardise the code returning process
// return the code directly from backend may keep the proces simple f

const fetchAll =async (dataSource:string)=>{
    const response = await axios.get(BASE_URLS[dataSource]+REQUESTS.FINDALL);
    const message = await response.data.message;
    return message;
}

const findOne = async (dataSource:string,params:string)=>{
    const response = await axios.get(BASE_URLS[dataSource]+REQUESTS.FIND+`${params}`);
    const message = await response.data.message 
    return message[0]
}

const createOne = async(dataSource:string,documentContext:Object)=>{
    const response = await axios.post(BASE_URLS[dataSource]+REQUESTS.CREATE,documentContext);
    const message = await response.data.message
    return message
}

const upsertDoc = async (dataSource:string,documentContext:Object)=>{
    const response  = await axios.put(BASE_URLS[dataSource]+REQUESTS.UPDATE,documentContext);
    const message = await response.data.message
    return message

}

const deleteDoc = async ( dataSource:string,documentContext:Object)=>{

    const response = await axios.delete(BASE_URLS[dataSource]+REQUESTS.DELETE,{data:documentContext});
    const data = await response.data
    return data

}


export { fetchAll, findOne ,createOne,upsertDoc,deleteDoc};
