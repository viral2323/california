import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import showToast from "../toast";

interface PropTypes {
  fileName: string;
  filterData: {}[];
  isFilterData: boolean;
  apiEndpoint: string;
  showingColumnList: string[];
  payloadData: string[];
  filterpayload: any;
  filterApiEndpoint: any;
  totalRecords: number;
  columnList: any;
  columnName: string;
}

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || "";

export default function DownloadPDFData(props: PropTypes) {
  const { fileName, columnList, filterData, isFilterData, apiEndpoint, showingColumnList, payloadData, filterApiEndpoint,filterpayload,totalRecords, columnName } = props;
  
  const downloadPdf = async () => {
    if(!isFilterData){
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
        } catch (e: any) {
          showToast(e.response.data, 'error', 3000)
        }
      };
      getData().then((data) => {
        download(data)
      });
    }else{
      
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
          download(response.items)
        }
        
      }catch (e:any){
        showToast(e.response.data, 'error', 3000)
      }
      
    }
  };

  const download = (data: any) => {
    const pdf = new jsPDF("l", "pt", "a4");
    let rows: (string | number | boolean)[][] = [];

    if (data && data.length > 0) {
      for(let i=0; i < data.length; i++){
        let temp : (string | number | boolean)[] = [];
        payloadData.forEach((item: string) => {
          const singleRow: { [key: string]: string | boolean | number} = data[i];
          temp.push(singleRow[item])
        })
        rows.push(temp)
      }
    } else {

    }
    autoTable(pdf, { html: "#my-table" });
    autoTable(pdf, {
      head: [showingColumnList],
      body: rows,
    });
    pdf.save(fileName);
  }

  return (
    <div className="w-[24px] h-[24px]" onClick={downloadPdf}>
      <PictureAsPdfIcon color="primary" sx={{ verticalAlign: 'super'  }} />
    </div>
  );
}
