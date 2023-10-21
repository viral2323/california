import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import showToast from "../toast";
import { AnyMxRecord } from "dns";

interface PropsTypes {
  fileName: string;
  filterData: {
  }[];
  isFilterData: boolean;
  apiEndpoint: string;
  filterpayload: any;
  filterApiEndpoint: any;
  totalRecords: number;
  columnList: any;
  columnName: string;
}
const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

export const DownloadCSVData = (props: PropsTypes) => {

  const { fileName, filterData, isFilterData, apiEndpoint, filterApiEndpoint,filterpayload, totalRecords, columnList, columnName } = props;

  const [csvData, setCsvData] = useState<{}[]>([]);
  const csvInstance = useRef<any | null>(null);

  useEffect(() => {
    if(csvData && csvData.length > 0 && csvInstance && csvInstance.current && csvInstance.current.link ){
      // setTimeout(() => {
        csvInstance.current.link.click()
        // setCsvData([])
      // },0)
    }
  }, [csvData])

  const getCSVData = async (
    event: any,
    // done: (proceed: boolean) => void
  ) => {
    event.stopPropagation()
    console.log("download csv");
    if (!isFilterData) {
      const getData = async () => {
        try {
          const response: any = await axios.get(
            `${apiBaseURL}/${apiEndpoint}`,
            {
              headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
              },
            }
          );

          return response.data;
        } catch (e:any) {
          showToast(e.response.data, 'error', 3000)
        }
      };

      getData().then((data) => {
        if (data && data.length > 0) {
          setCsvData([...data]);
          // done(true);
        } else {
          // done(false);
        }
      });
      
    }else{
      // const api = apiEndpoint == "getAllRegulationsForPdfCsv" ? globalSearchRegulation : apiEndpoint == "gelAllRegulation" ? fetchRegulations : () => {}
      try{
        const response = await filterApiEndpoint(
          1,
          totalRecords,
          columnName,
          false,
          filterpayload,
          columnList,
        );
        if(response?.items.length > 0){
          setCsvData([...response.items]);
          // done(true);                             
        }else{
          // done(false);
        }
        
      }catch (e:any){
        showToast(e.response.data, 'error', 3000)
      }
    }
  };
  const getData = () => {
    return csvData
  }

  return (
    
    <>
      <div style={{display: 'none'}}>
      <CSVLink
        className="w-[24px] h-[24px]"
        title="Download as CSV"
        data={getData()}
        filename={fileName}
        // asyncOnClick={true}
        // onClick={getCSVData}
        ref={csvInstance}
      >
      </CSVLink>
      </div>
      <SaveAltIcon onClick={getCSVData} color="primary" sx={{ verticalAlign: 'super' }} />
    </>
  );
};
