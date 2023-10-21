import React, { useState, useRef, useEffect, useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import RegulationsModal from "../../shared/modals/RegulationsModal";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "../../shared/modals/delete-modal/DeleteModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { FormLabel, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  fetchRegulations,
  getDeletedRegulations,
  globalSearchRegulation,
  activateRegulation
} from "../../services/apiServices";
import CachedIcon from "@mui/icons-material/Cached";
import FieldFilter from "../fieldFilter/Filter.Componenent";
import ShowColumnModal from "../../shared/modals/ShowColmnModal";
import { Button, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledMenu } from "../fieldFilter/Common.Styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownloadPDFData from "../downlaodData/pdfData";
import { DownloadCSVData } from "../downlaodData/csvData";
import showToast from "../toast";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface IApiData {
  speciesId: number;
  commonName: string;
  sortedName: string;
  speciesGroupsNames: string;
}

interface fieldFilterPayload {
  filterPayload: {
    filterType: string;
    filterColumn: string;
    filterValue: string | number;
    id: number;
  }[];
}

function createData(
  id: number,
  source: string,
  code: string,
  title: string,
  parentCode: string,
  verbatim: string,
  type: string,
  details: any[]
) {
  return { id, source, code, title, parentCode, verbatim, type };
}

const rows = [
  createData(
    1,
    "CCR Title 14",
    "7.50(a)",
    "General Provisions",
    "14CCR 7.59",
    "General Provisions",
    "Marine",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
  createData(
    2,
    "California Fish and Game Code",
    "9.50(a)(1)",
    "Every body of water listed",
    "14CCR 7.59",
    "Every body of water listed",
    "General",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
  createData(
    3,
    "Code of Federal Regulation Title 50",
    "5.50(a)(3)",
    "General Provisions",
    "14CCR 7.59",
    "General Provisions",
    "Fisheries",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
  createData(
    4,
    "CCR Title 14",
    "7.50(a)",
    "These waters ,ay also be subject",
    "14CCR 7.59",
    "These waters ,ay also be subject",
    "General",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
  createData(
    5,
    "CCR Title 14",
    "7.50(a)",
    "These waters ,ay also be subject",
    "14CCR 7.59",
    "These waters ,ay also be subject",
    "Fisheries",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
  createData(
    6,
    "CCR Title 14",
    "7.50(a)",
    "These waters ,ay also be subject",
    "14CCR 7.59",
    "These waters ,ay also be subject",
    "Marine",
    [
      {
        name: "Protection of Resources in MPAs and MMAs, as defined in Public Resources Code Section 36710:",
        innerObj: [
          {
            name: "(A) State Marine Reserves: In a state marine reserve, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource, except under a scientific collecting permit issued by the department pursuant to Section 650 or specific authorization from the commission for research, restoration, or monitoring purposes.",
          },
          {
            name: "(B) State Marine Parks: In a state marine park, it is unlawful to injure, damage, take, or possess any living or nonliving marine resource for commercial purposes. Any human use that would compromise protection of the species of interest, natural community or habitat, or geological, cultural, or recreational features, may be restricted by the commission as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, monitoring, and educational activities and certain recreational harvest in a manner consistent with protecting resource values.",
          },
          {
            name: "(C) State Marine Conservation Areas: In a state marine conservation area, it is unlawful to injure, damage, take, or possess any living, geological, or cultural marine resource for commercial or recreational purposes, or a combination of commercial and recreational purposes except as specified in subsection 632(b), areas and special regulations for use. The department may issue scientific collecting permits pursuant to Section 650. The commission may authorize research, education, and recreational activities, and certain commercial and recreational harvest of marine resources, provided that these uses do not compromise protection of the species of interest, natural community, habitat, or geological features.",
          },
          {
            name: "(D) State Marine Recreational Management Areas: In a state marine recreational management area, it is unlawful to perform any activity that would compromise the recreational values for which the area may be designated. Recreational opportunities may be protected, enhanced, or restricted, while preserving basic resource values of the area. No other use is restricted unless specified in subsection 632(b), areas and special regulations for use.",
          },
        ],
      },
    ]
  ),
];

const showingColumnList = [
  "Source",
  "Code",
  "Title",
  "Parent Code",
  "Verbatim",
  "Type",
];

const columnList: { [key: string]: string } = {
  Source: "Source",
  Code: "Code",
  Title: "Title",
  "Parent Code": "ParentCode",
  Verbatim: "Verbatim",
  Type: "Type",
};

const showHideColumns = [
  {
    columnName: "Source",
    checked: true,
  },
  {
    columnName: "Code",
    checked: true,
  },
  {
    columnName: "Title",
    checked: true,
  },
  {
    columnName: "Parent Code",
    checked: true,
  },
  {
    columnName: "Verbatim",
    checked: true,
  },
  {
    columnName: "Type",
    checked: true,
  },
];

const PreIcon = () => (
  <Box className="flex justify-center items-center gap-x-[5px] pr-[0.4rem]">
    <KeyboardArrowLeftIcon sx={{ fontSize: "26px" }} />
    <Typography>Previous</Typography>
  </Box>
);

const NextIcon = () => (
  <Box className="flex justify-center items-center gap-x-[5px] pl-[0.4rem]">
    <Typography>Next</Typography>
    <KeyboardArrowRightIcon sx={{ fontSize: "26px" }} />
  </Box>
);

function RegulationsComponent() {
  //New States
  const [allRegulationsData, setAllRegulationData] = useState<any>([]);
  const [sortDirection, setSortDirection] = useState<boolean>(true);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const totalPage = Math.ceil(totalRecord / rowsPerPage) ?? 0;
  const [columnName, setColumnName] = useState<string>("RegulationId");
  const [filterItem, setFilterItem] = useState<number[]>([0]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorColumnEl, setAnchorColumnEl] = useState<null | HTMLElement>(
    null
  );
  const [typeFilter, setTypeFilter] = useState<string[]>([
    "Marine",
    "Fisheries",
    "General",
  ]);
  const typeEnum: { [key: string]: "primary" | "info" | "secondary" } = {
    Marine: "primary",
    Fisheries: "info",
    General: "secondary",
  };
  const [fieldFilterPayload, setFieldFilterPayload] =
    useState<fieldFilterPayload>({
      filterPayload: [
        {
          filterType: "EQUALS",
          filterColumn: "",
          filterValue: "",
          id: 0,
        },
      ],
    });

  //show & hide column
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const localStorageItem = localStorage.getItem("regulation");
  const localData = localStorageItem
    ? JSON.parse(localStorageItem)
    : showHideColumns;
  const [showHideColumnList, setShowHideColumnList] =
    useState<{ [key: string]: string | boolean }[]>(localData);

  //main serach
  const [loader, setLoader] = useState<boolean>(false);
  const [isMainSearchFilterApply, setIsMainSearchFilterApply] =
    useState<boolean>(false);
  const [mainSearchValue, setMainSearchValue] = useState<string>("");

  const [deleteOpen, setDeleteopen] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("Add Regulations");
  const [modalData, setModalData] = useState<any>();
  const [modalType, setModalType] = useState<any>("");

  //Filter state
  const [globalFilterApplied, setGlobalFilterApplied] = useState<boolean>(true)
  const [columnFilterApplied, setColumnFilterApplied] = useState<boolean>(false)
  const [storeGlobalFilterPayload, setStoreGlobalFilterPayload] = useState<any>([])
  const [storeFieldFilterPayload, setStoreFieldFilterPayload] = useState<any>([])

  const [regulationId, setRegulationId] = useState<string | number>('')
  const [isDeletedData, setIsDeletedData] = useState<boolean>(false)
  type ModalType = "add-parent" | "add-child" | "view" | "edit";

  const fetchData = async () => {
    let typePayload: any = [];

    typePayload = typeFilter.map((item: string) => {
      return {
        filterType: "EQUALS",
        filterColumn: "Type",
        filterValue: item,
      };
    });
    let searchPayload: any = [];
      searchPayload =
        mainSearchValue.length > 0
          ? ["Code", "Title", "Verbatim"].map((item: string) => {
              return {
                filterType: "CONTAINS",
                filterColumn: item,
                filterValue: mainSearchValue,
              };
            })
          : [];

    const payload = [...typePayload, ...searchPayload];
    try {
      const response = await globalSearchRegulation(
        page,
        rowsPerPage,
        "RegulationId",
        false,
        payload,
        columnList
      );
      if (Array.isArray(response?.items)) {
        setAllRegulationData(response.items);    
      } else {
        setAllRegulationData([]);
      }
      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }
      setLoader(false);
    } catch (error) {
      console.error("Error while fetching data:", error);
      // setAllRegulationData([]);
      showToast('Error while fetching data.','error',3000)
      setLoader(false);
    }
  };

  useEffect(() => {
    if(isDeletedData){
      getDeleteRegulationsData(true)
    }else{
      if(globalFilterApplied){
        applyTypeFilter(typeFilter, '', true);
      }else if(columnFilterApplied){
        applyFieldFilter(true)
      }
    }

  }, [page, rowsPerPage, sortDirection]);

  const searchRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const apiControllerRef = useRef<AbortController | null>();
  const debounceSearch = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    clearTimeout(searchRef.current);

    if (apiControllerRef.current) {
      apiControllerRef.current.abort();
    }
    const value = typeof event == "string" ? event : event.target.value;
    const controller = new AbortController();
    apiControllerRef.current = controller;
    const signal = controller.signal;

    searchRef.current = setTimeout(async () => {
      setLoader(true);
      let searchPayload =
        value !== ""
          ? ["Code", "Title", "Verbatim"].map((item: string) => {
              return {
                filterType: "CONTAINS",
                filterColumn: item,
                filterValue: value,
              };
            })
          : [];

      let typePayload =
        typeFilter.length > 0
          ? typeFilter.map((item: string) => {
              return {
                filterType: "EQUALS",
                filterColumn: "Type",
                filterValue: item,
              };
            })
          : [];

      const apiPayload = [...searchPayload, ...typePayload];

      try {
        const response = await globalSearchRegulation(
          1,
          rowsPerPage,
          "RegulationId",
          sortDirection,
          apiPayload,
          columnList,
          signal
        );
        if (Array.isArray(response?.items)) {
          setAllRegulationData(response.items);
        } else {
          setAllRegulationData([]);          
        }
        
        clearFieldFilter('',true)
        setStoreGlobalFilterPayload([...apiPayload])
        setGlobalFilterApplied(true)
        setPage(1)
        if (typeof response.totalRecords === "number") {
          setTotalRecord(response.totalRecords);
        } else {
          setTotalRecord(0);
        }
        setLoader(false);
        if (typeof event == "string" && event !== "") {
          setIsMainSearchFilterApply(true);
        }
      } catch (error:any) {
        console.error("Error while fetching data:", error);
        showToast(error.response.data, 'error', 3000)
        setAllRegulationData([]);
        setLoader(false);
        if (typeof event == "string" && event !== "") {
          setIsMainSearchFilterApply(true);
        }
        setStoreGlobalFilterPayload([...apiPayload])
        setGlobalFilterApplied(true)
        clearFieldFilter('',true)
      }
    }, 300);
    setMainSearchValue(value);
  };

  const openModalHandler = (row?: any, type?: ModalType) => {
    if (type === "add-child") {
      setModalData({ ...row, parentCode: row.code, code: row.code });
    } else if (type === "view" || type === "edit") {
      setModalData({ ...row });
    } else if (type === "add-parent") {
      setModalData({});
    }
    setOpenModal(true);
    setModalType(type);
  };

  const closeModalHandler = (type: string) => {
    if(type=='update-list'){
        if(globalFilterApplied){
          applyTypeFilter(typeFilter);
        }else if(columnFilterApplied){
          applyFieldFilter()
        }
    }
    setOpenModal(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const deleteModalOpenHandler = (regulationId: string | number) => {
    setDeleteopen(true);
    setRegulationId(regulationId)
  };
  const deleteModalCloseHandler = (activate: boolean, isDeleted?: boolean) => {
    if(activate){
      reverToDeletedFilter()
    }else{
      if(isDeleted){
        if(globalFilterApplied){
          applyTypeFilter(typeFilter)
        }else if(columnFilterApplied){
          applyFieldFilter()
        }else{
          fetchData()
        }
      }
    }

    setDeleteopen(false);
  };

  const open = Boolean(anchorEl);
  const tableRow = useRef(null);

  const columnFilterListHandle = (
    event: React.MouseEvent<HTMLElement>,
    column: string
  ) => {
    setAnchorEl(event.currentTarget);
    setColumnName(column);
  };

  const columnFilterhandler = () => {
    setAnchorColumnEl(tableRow?.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const columnFilterClose = () => {
    setAnchorColumnEl(null);
  };

  const showHideColumn = (colName: string) => {
    const updatedColumns = showHideColumnList.map(
      (item: { [key: string]: string | boolean }) => {
        if (colName === item.columnName) {
          return { ...item, checked: !item.checked };
        }
        return item;
      }
    );

    localStorage.setItem("regulation", JSON.stringify(updatedColumns));
    setShowHideColumnList([...updatedColumns]);
    setAnchorEl(null);
  };

  const applyFieldFilter = async (changePagination?: boolean) => {
    try {
      const pageNumber = columnFilterApplied ? changePagination ? page : 1 : 1;
      const response = await fetchRegulations(
        pageNumber,
        rowsPerPage,
        columnList[columnName],
        sortDirection,
        fieldFilterPayload.filterPayload,
        columnList
      );
      if (Array.isArray(response.items)) {
        setAllRegulationData(response.items);
      } else {
        setAllRegulationData([]);
      }
      // resetMainSearchFilter('',true)
      resetMainFilter()
      setColumnFilterApplied(true)
      setStoreFieldFilterPayload(fieldFilterPayload.filterPayload)
      setPage(pageNumber)
      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }
      setAnchorColumnEl(null);
    } catch (e) {
      showToast('Error while fetching data.', 'error', 3000)
      setAllRegulationData([]);
      // resetMainSearchFilter('',true)
      resetMainFilter()
      setColumnFilterApplied(true)
      setStoreFieldFilterPayload(fieldFilterPayload.filterPayload)
    }
  };

  const clearFieldFilter = (e: any, isClear?: boolean) => {
    if(!isClear){
      fetchData();
    }
    setAnchorEl(null);
    setFieldFilterPayload({
      filterPayload: [
        {
          filterType: "EQUALS",
          filterColumn: '',
          filterValue: "",
          id: 0,
        },
      ],
    });
    setFilterItem([0]);
    setColumnFilterApplied(false)
    setStoreFieldFilterPayload([])
    
  };

  // show hide column functionality
  const openManageColumnModal = () => {
    setOpenColumnModal(!openColumnModal);
    setAnchorEl(null);
  };

  const checkAllColumnAreHidden = () => {
    const flag = showHideColumnList.every(
      (item: { [key: string]: string | boolean }) => !item.checked
    );
    return flag;
  };

  const showCellData = (colName: string) => {
    const data = showHideColumnList.find(
      (item: { [key: string]: string | boolean }) => item.columnName == colName
    );
    if (data) {
      return data.checked;
    }
    return true;
  };

  const showAllColumns = () => {
    const updatedColumns = showHideColumnList.map(
      (item: { [key: string]: string | boolean }) => {
        return { ...item, checked: true };
      }
    );
    localStorage.setItem("regulation", JSON.stringify(updatedColumns));
    setShowHideColumnList([...updatedColumns]);
  };

  const resetMainSearchFilter = (e:any,isClear?: boolean) => {
    if(!isClear){
      applyTypeFilter(typeFilter, "clear",false);
    }
    setMainSearchValue("");
    setIsMainSearchFilterApply(false);
  };
  const resetMainFilter = () => {
    setGlobalFilterApplied(false)
    setStoreGlobalFilterPayload([])
    setTypeFilter([])
  }

  const truncateLargeText = (text: string) => {
    const newText = text
      ? text.length > 30
        ? text.substring(0, 30) + "..."
        : text
      : "";
    return newText;
  };
const [ispending, startTransition] = useTransition()
  const handleCheckboxFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterName: string
  ) => {
    let selectedValues: string[] = [];
    event.target.checked
      ? selectedValues.push(filterName)
      : (selectedValues = typeFilter.filter((item) => item !== filterName));
    if (event.target.checked) {
      startTransition(() => {
        setTypeFilter((pre) => [...pre, ...selectedValues]);
        applyTypeFilter([...typeFilter, ...selectedValues]);
      })
      
    } else {
      startTransition(() => {
        setTypeFilter([...selectedValues]);
        applyTypeFilter([...selectedValues]);
      })
     
    }
  };
 
  const applyTypeFilter = async (data: string[], isClear?: string, changePagination?: boolean) => {
    if (apiControllerRef.current) {
      apiControllerRef.current.abort();
    }
    let typePayload: any = [];
    
      typePayload = data.map((item: string) => {
        return {
          filterType: "EQUALS",
          filterColumn: "Type",
          filterValue: item,
        };
      });
    
    
    let searchPayload: any = [];
    if (isClear && isClear == "clear") {
      //do nothing because search is cleared
    } else {
      searchPayload =
        mainSearchValue.length > 0
          ? ["Code", "Title", "Verbatim"].map((item: string) => {
              return {
                filterType: "CONTAINS",
                filterColumn: item,
                filterValue: mainSearchValue,
              };
            })
          : [];
    }

    const payload = [...typePayload, ...searchPayload];
    const controller = new AbortController();
    apiControllerRef.current = controller;
    const signal = controller.signal;
    try {
      const pageNumber = globalFilterApplied ? changePagination ? page : 1 : 1
      const response = await globalSearchRegulation(
        pageNumber,
        rowsPerPage,
        "RegulationId",
        sortDirection,
        payload,
        columnList,
        signal
      );
      if (Array.isArray(response?.items)) {
        setAllRegulationData(response.items);
      } else {
        setAllRegulationData([])
      }
      clearFieldFilter('',true)
      setStoreGlobalFilterPayload([...payload])
      setGlobalFilterApplied(true)
      setPage(pageNumber)
      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }
      setLoader(false);
    } catch (error: any) {
      console.error("Error while fetching data:", error);
      if(error.message == "Network Error"){
        showToast("Netowrk Error",'error',3000)
      }else{
        showToast(error.response.data,'error',3000)
      }
      clearFieldFilter('',true)
      setAllRegulationData([]);
      setLoader(false);
      setStoreGlobalFilterPayload([...payload])
      setGlobalFilterApplied(true)
    }
  };

  const checkFilterIsApplied = () => {
    if(globalFilterApplied){
      return true
    }
    if(columnFilterApplied){
      return true
    }
    return false
  }

  const getDeleteRegulationsData = async (changePagination?: boolean) =>{
    if(isDeletedData) return reverToDeletedFilter();  // redirect back to regulation screen

    //show deleted regultion data
    let apiPayload : any = []
    let pageNumber : number = changePagination ? page : 1
    // if(globalFilterApplied){
    //   apiPayload = [...storeGlobalFilterPayload]
    // }else if(columnFilterApplied){
    //   apiPayload = [...storeFieldFilterPayload]
    // }
    try {
      const response = await getDeletedRegulations(
        pageNumber,
        rowsPerPage,
        "RegulationId",
        sortDirection,
        apiPayload,
        columnList,
      )
        
      if (Array.isArray(response?.items)) {
        setAllRegulationData(response.items);
      } else {
        setAllRegulationData([])
      }

      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }

      if(!response.data){
        
      }else{
        showToast(response.data, 'error',3000)
      }
      clearFieldFilter('',true)
      resetMainFilter()
      setIsDeletedData(true)
      setLoader(false);
    }catch (error: any){
      if(error.message == "Network Error"){
        showToast("Netowrk Error",'error',3000)
      }else{
        showToast(error.response.data,'error',3000)
      }
    }
    
  }

  const reverToDeletedFilter = () => {
    applyTypeFilter([
      "Marine",
      "Fisheries",
      "General",
    ])
    setTypeFilter([
      "Marine",
      "Fisheries",
      "General",
    ])
    setIsDeletedData(false)
  }

  const activateRegulations =async (Id: number) => {
    setDeleteopen(true);
    setRegulationId(regulationId)
  } 

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <>
        <Typography
          variant="h2"
          className="mb-[2.5rem] md:mb-[2.5rem] text-center"
          sx={{ color: "#FBAD23" }}
        >
          {isDeletedData ? "Deleted Regulations": "Regulations"}
        </Typography>
        <div className="mb-[20px] md:flex  items-end gap-5  justify-between">
          <div className="flex justify-start gap-x-4">
            <div className="custom-form-control">
              <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-search">
                  Search
                </InputLabel>
                <Input
                  id="standard-adornment-search"
                  type="text"
                  sx={{ width: "100%" }}
                  value={mainSearchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    debounceSearch(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="Search">
                        {isMainSearchFilterApply ? (
                          <ClearIcon
                            color="primary"
                            onClick={resetMainSearchFilter}
                          />
                        ) : (
                          <SearchIcon
                            color="primary"
                            onClick={() =>
                              mainSearchValue !== ""
                                ? debounceSearch(mainSearchValue)
                                : {}
                            }
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="flex items-end justify-center mb-[0.4rem]">
              <IconButton aria-label="Download as PDF" title="Download as PDF">
                <DownloadPDFData
                  columnName='RegulationId'
                  filterpayload={globalFilterApplied ? storeGlobalFilterPayload : columnFilterApplied ? storeFieldFilterPayload : []}
                  filterApiEndpoint={globalFilterApplied ? globalSearchRegulation : columnFilterApplied ? fetchRegulations : () => {}}
                  totalRecords={totalRecord}
                  fileName="regulations"
                  filterData={allRegulationsData}
                  apiEndpoint={'getAllRegulationsForPdfCsv'}
                  isFilterData={checkFilterIsApplied()}
                  showingColumnList={showingColumnList}
                  columnList={columnList}
                  payloadData={['source','code','title',  'parentCode','verbatim','type']}
                />
              </IconButton>
              <IconButton
                aria-label="Download as CSV File"
                title="Download as CSV"
              >
                <DownloadCSVData
                  columnName='RegulationId'
                  fileName="regulations"
                  filterData={allRegulationsData}
                  apiEndpoint="getAllRegulationsForPdfCsv"
                  isFilterData={checkFilterIsApplied()}
                  columnList={columnList}
                  filterpayload={globalFilterApplied ? storeGlobalFilterPayload : columnFilterApplied ? storeFieldFilterPayload : []}
                  filterApiEndpoint={globalFilterApplied ? globalSearchRegulation : columnFilterApplied ? fetchRegulations : () => {}}
                  totalRecords={totalRecord}
                />
              </IconButton>
              <IconButton aria-label="Refresh table" title="Refresh table">
                <CachedIcon color="primary" onClick={resetMainSearchFilter} />
              </IconButton>
            </div>
            <div className="mb-[0.4rem]">
              <FormControl>
                <FormLabel sx={{ fontWeight: "bold", color: "#343a40" }}>
                  Type:
                </FormLabel>
                <FormGroup sx={{ flexDirection: "row" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={typeFilter.includes("Marine")}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleCheckboxFilter(event, "Marine")}
                      />
                    }
                    label="Marine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={typeFilter.includes("Fisheries")}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleCheckboxFilter(event, "Fisheries")}
                      />
                    }
                    label="Fisheries"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={typeFilter.includes("General")}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleCheckboxFilter(event, "General")}
                      />
                    }
                    label="General"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>

          <div className="flex gap-x-2.5 my-2">
            <Button variant="contained" onClick={() => getDeleteRegulationsData()} startIcon={isDeletedData ? <ArrowBackIosIcon/> : <DeleteIcon />}>
              {isDeletedData ? "Back to Regulations" : "Show Deleted Regulations"}
            </Button>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                openModalHandler(null, "add-parent");
                setTitle("Add Regulations");
              }}
            >
              Add New
            </Button>
            {checkAllColumnAreHidden() && (
              <Box>
                <Button variant="contained" onClick={showAllColumns}>
                  Show All Columns
                </Button>
              </Box>
            )}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: "#000" }} ref={tableRow}>
                {showHideColumnList.map(
                  (item: { [key: string]: string | boolean }) => {
                    if (item.checked) {
                      return (
                        <TableCell style={{ fontWeight: "bold" }}>
                          <div className="flex justify-between gap-1">
                            <span className="flex">{item.columnName}</span>
                            <span className="flex">
                              <IconButton
                                sx={{
                                  p: 0,
                                  color: "#ffffff",
                                }}
                                aria-label="Filter"
                                title="Column Filter"
                                onClick={(e) => {
                                  if (typeof item.columnName == "string")
                                    columnFilterListHandle(e, item.columnName);
                                }}
                              >
                                <MoreVertIcon
                                  sx={{ color: "#000", fontSize: "20px" }}
                                />
                              </IconButton>
                            </span>
                          </div>
                        </TableCell>
                      );
                    }
                  }
                )}
                {!checkAllColumnAreHidden() && (
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(allRegulationsData) &&
              allRegulationsData.length > 0 ? (
                allRegulationsData.map((item, index) => (
                  <TableRow key={index}>
                    {showCellData("Source") && (
                      <TableCell>{item.source}</TableCell>
                    )}
                    {showCellData("Code") && <TableCell>{item.code}</TableCell>}
                    {showCellData("Title") && (
                      <TableCell>{truncateLargeText(item.title)}</TableCell>
                    )}
                    {showCellData("Parent Code") && (
                      <TableCell>{item.parentCode}</TableCell>
                    )}
                    {showCellData("Verbatim") && (
                      <TableCell>{truncateLargeText(item.verbatim)}</TableCell>
                    )}
                    {showCellData("Type") && (
                      <TableCell>
                        <Chip
                          sx={{
                            borderRadius: "5px",
                            fontSize: " calc(1.125rem + 0.1vw)",
                            color: "#fff",
                            backgroundColor: `${
                              item.type == "General" && "#483723"
                            }`,
                          }}
                          color={typeEnum[item.type]}
                          label={truncateLargeText(item.type)}
                        />
                      </TableCell>
                    )}
                    {!checkAllColumnAreHidden() && (
                      <>{ !isDeletedData ? 
                      <TableCell>
                        <IconButton
                          aria-label="Add"
                          onClick={() => {
                            setTitle("Add Child Regulations");
                            openModalHandler(item, "add-child");
                          }}
                        >
                          <AddIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="View"
                          onClick={() => {
                            setTitle("View Regulations");
                            openModalHandler(item, "view");
                          }}
                        >
                          <VisibilityIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="Edit"
                          onClick={() => {
                            setTitle("Edit Regulations");
                            openModalHandler(item, "edit");
                          }}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => deleteModalOpenHandler(item.regulationId)}
                        >
                          <DeleteIcon fontSize="small" color="primary" />
                        </IconButton>
                      </TableCell> :
                      <TableCell>
                        <Button variant="contained" onClick={() => activateRegulations(item.regulationId)} color='secondary'>Activate</Button>
                      </TableCell>}
                      </>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    {!checkAllColumnAreHidden()
                      ? "No data available"
                      : "All Columns are Hide"}
                  </TableCell>
                </TableRow>
              )}
              {allRegulationsData.length > 0 && checkAllColumnAreHidden() && (
                <TableRow>
                  <TableCell colSpan={7}>{"All Columns are Hide"}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          className="float-right my-5"
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: PreIcon, next: NextIcon }}
              {...item}
            />
          )}
        />
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          horizontal={"right"}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <ArrowUpwardIcon />
            <span>Sort by ASC</span>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ArrowDownwardIcon />
            <span>Sort by DESC</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => {
              columnFilterhandler();
              handleClose();
            }}
            disableRipple
          >
            <FilterAltIcon />
            <span>Filter</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => showHideColumn(columnName)} disableRipple>
            <VisibilityOffIcon />
            <span>Hide Column</span>
          </MenuItem>
          <MenuItem onClick={openManageColumnModal} disableRipple>
            <ViewColumnIcon />
            <span>manage Columns</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={clearFieldFilter} disableRipple>
            <ClearIcon />
            <span>Clear Filter</span>
          </MenuItem>
        </StyledMenu>
        {openModal && (
          <RegulationsModal
            title={title}
            open={openModal}
            type={
              modalType === "add-child"
                ? "add-child"
                : modalType === "add-parent"
                ? "add-parent"
                : modalType === "view"
                ? "view"
                : "edit"
            }
            onClose={closeModalHandler}
            data={modalData}
          />
        )}
        <DeleteModal open={deleteOpen} isActivate={isDeletedData} regulationId={regulationId} handleClose={deleteModalCloseHandler} />
        {anchorColumnEl != null && (
          <FieldFilter
            anchorRef={anchorColumnEl}
            closeFilter={columnFilterClose}
            applyFilter={applyFieldFilter}
            fieldFilterPayload={fieldFilterPayload}
            setFieldFilterPayload={setFieldFilterPayload}
            filterItem={filterItem}
            setFilterItem={setFilterItem}
            listOfColumn={showingColumnList}
          />
        )}
        <ShowColumnModal
          open={openColumnModal}
          columnList={showHideColumnList}
          onChangeInput={showHideColumn}
          onClose={openManageColumnModal}
          tableName="Regulation"
        />
      </>
    </>
  );
}

export default RegulationsComponent;
