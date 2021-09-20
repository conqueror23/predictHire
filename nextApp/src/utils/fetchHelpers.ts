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
    CREATE:"createDocument",
    UPDATE:"updateById",
    DELETE:"deleteById",
}

interface RequestParams {
  url: string;
  method: string;
}



const fetchAll =async (dataSource:string)=>{
    const response = await axios.get(BASE_URLS[dataSource]+REQUESTS.FINDALL);
    const dataSet = await response.data.message;
    return dataSet;
}

const findOne = async (dataSource:string,params:string)=>{
    const response = await axios.get(BASE_URLS[dataSource]+REQUESTS.FIND+`${params}`);
    const dataSet = await response.data.message 
    console.log("data set here",dataSet)
    return dataSet[0]
}



export { fetchAll, findOne };
