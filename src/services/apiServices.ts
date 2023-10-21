import axios, {AxiosRequestConfig} from "axios";
import { AnyAaaaRecord } from "dns";

interface filedFilterPayload {
  filterType: string;
  filterColumn: string;
  filterValue: string | number;
  id?: string | number;
}

export const fetchSpecies = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }

  try {
    const response = await axios.post(`${apiBaseURL}/species`, apiPayload, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortDescending: sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

export const searchSpecies = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string },
  abortController?: AbortController['signal'] | null
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }

  try {
    const axiosConfig: AxiosRequestConfig = {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      signal: abortController ? abortController : undefined,
    };
    const response = await axios.post(
      `${apiBaseURL}/searchSpecies`,
      apiPayload,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

// New function for sorted data
export const fetchSortedSpecies = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.get(`${apiBaseURL}/species`, {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDescending,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the sorted data", error);
    throw error;
  }
};

export const fetchSpeciesGroups = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const response = await axios.post(
      `${apiBaseURL}/speciesGroups`,
      apiPayload,
      {
        params: {
          pageNumber,
          pageSize,
          sortColumn,
          sortDescending,
        },
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

export const searchSpeciesGroups = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string },
  abortController?: AbortController['signal'] | null
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const axiosConfig: AxiosRequestConfig = {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      signal: abortController ? abortController : undefined,
    };
    const response = await axios.post(
      `${apiBaseURL}/searchSpeciesGroups`,
      apiPayload,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};


export const fetchSpeciesGroupById = async (speciesGroupId: number) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.get(
      `${apiBaseURL}/speciesGroups/speciesGroupId`,
      {
        params: {
          speciesGroupId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

export const fetchFeatures = async (layerName: string, layerCode: number) => {
  const apiBaseURL = process.env.REACT_APP_ARC_GIS_FEATURES_API || "";
  console.log(apiBaseURL);
  try {
    const response = await axios.get(`${apiBaseURL}/${layerName}/FeatureServer/${layerCode}/query`, {
      params: {
        where: "1=1",
        outFields: "*",
        f: "pjson",
        //token: process.env.REACT_APP_ARC_GIS_API_KEY,
        returnGeometry: true,
        spatialRel: "esriSpatialRelIntersects",
        orderByFields: "OBJECTID ASC",
        resultOffset: 0,
        resultRecordCount: 50
      },
      
    });
    console.log("feature resoponse", response.data);
    return response.data;
  } catch(error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

//Take Methods Module Apis

export const fetchTakeMethods = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const response = await axios.post(
      `${apiBaseURL}/takeMethods`,
      apiPayload,
      {
        params: {
          pageNumber,
          pageSize,
          sortColumn,
          sortDescending,
        },
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

export const searchTakeMethods = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string },
  abortController?: AbortController['signal'] | null
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const axiosConfig: AxiosRequestConfig = {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      signal: abortController ? abortController : undefined,
    };
    const response = await axios.post(
      `${apiBaseURL}/searchTakeMethods`,
      apiPayload,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};


// Regulations API

export const fetchRegulations = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }

  try {
    const response = await axios.post(`${apiBaseURL}/getAllRegulations`, apiPayload, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortDescending: sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
}

export const globalSearchRegulation = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string },
  abortController?: AbortController['signal'] | null
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const axiosConfig: AxiosRequestConfig = {
      params: {
        pageNumber,
        pageSize,
        sortColumn,
        sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      signal: abortController ? abortController : undefined,
    };
    const response = await axios.post(
      `${apiBaseURL}/globalSearchRegulations`,
      apiPayload,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};

export const searchRegulationCode = async (
  code: string
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  let apiPayload: {code: string} = {code: ''}
  try {
    const response = await axios.post(`${apiBaseURL}/searchRegulationCode`, apiPayload, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
}

export const fetchRegulationById = async (
  regulationId: string
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.get(
      `${apiBaseURL}/getAllRegulationsById/regulationId`,
      {
        params: {
          regulationId,
        },
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    // return error
  }
}

export const addRegulation = async (
  regulation: {
    source: string,
    parentCode: string,
    code: string,
    title: string,
    type: string,
    verbatim: string
  }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.post(`${apiBaseURL}/addRegulation`, regulation, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("There was an error fetching the data", error);
    return error.response.data
  }

}

export const fetchParentCodes = async () =>  {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.get(`${apiBaseURL}/getAllParentCodes`, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    return error
  }
}

export const deleteRegulations = async (regId: {regulationId: number}) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.delete(`${apiBaseURL}/deleteRegulation`,{
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      data: regId
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    return error
  }
}

export const updateRegulation = async (
  regulation: {
    source: string,
    parentCode: string,
    code: string,
    title: string,
    type: string,
    verbatim: string,
    regulationId: number
  }
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";
  try {
    const response = await axios.put(`${apiBaseURL}/updateRegulation`, regulation, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }

}


export const getDeletedRegulations = async (
  pageNumber: number,
  pageSize: number,
  sortColumn: string,
  sortDescending: boolean,
  payload?: filedFilterPayload[],
  columnList?: { [key: string]: string }        
) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || '';
  let apiPayload: filedFilterPayload[] = [];
  if (payload && payload[0]) {
    payload.forEach((item: filedFilterPayload) => {
      if(item.filterColumn){
        apiPayload.push({
          filterType: item.filterType,
          filterColumn: columnList ? columnList[item.filterColumn] : '',
          filterValue: item.filterValue,
        });
      }
    });
  }
  try {
    const response = await axios.post(`${apiBaseURL}/getAllDeletedRegulations`,apiPayload, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortColumn: sortColumn,
        sortDescending: sortDescending,
      },
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("There was an error fetching the data", error);
    return error.response
  }
}

export const activateRegulation = async (paylod: {regulationId: number}) => {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL || '';

  try {
    const response = await axios.put(`${apiBaseURL}/activateRegulation`, paylod, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
}