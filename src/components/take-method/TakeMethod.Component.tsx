import React, { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ClearIcon from "@mui/icons-material/Clear";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledMenu } from "../fieldFilter/Common.Styles";
import {
  fetchTakeMethods,
  searchTakeMethods,
} from "../../services/apiServices";
import FieldFilter from "../fieldFilter/Filter.Componenent";
import DownloadPDFData from "../downlaodData/pdfData";
import { DownloadCSVData } from "../downlaodData/csvData";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ShowColumnModal from "../../shared/modals/ShowColmnModal";
import { Button, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import showToast from "../toast";

interface IApiData {
  id: number;
  takeMethodName: string;
  definitionInRegulation: string;
}

interface fieldFilterPayload {
  filterPayload: {
    filterType: string;
    filterColumn: string;
    filterValue: string | number;
    id: number;
  }[];
}

const showingColumnList = ["Take Method Name", "Definition In Regulation"];

const columnList: { [key: string]: string } = {
  "Take Method Name": "TakeMethodName",
  "Definition In Regulation": "DefinitionInRegulation",
};

const showHideColumns = [
  {
    columnName: "Take Method Name",
    checked: true,
  },
  {
    columnName: "Definition In Regulation",
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

function TakeMethodComponent() {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loader, setLoader] = useState<boolean>(false);
  const [isMainSearchFilterApply, setIsMainSearchFilterApply] =
    useState<boolean>(false);
  const [mainSearchValue, setMainSearchValue] = useState<string>("");
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const totalPage = Math.ceil(totalRecord / rowsPerPage) ?? 0;
  const [page, setPage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorColumnEl, setAnchorColumnEl] =
    React.useState<null | HTMLElement>(null);
  const [columnName, setColumnName] = useState<string>("TakeMethodId");
  const [data, setData] = useState<IApiData[]>([]);
  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [filterItem, setFilterItem] = useState<number[]>([0]);
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
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const localStorageItem = localStorage.getItem("take-method");
  const localData = localStorageItem
    ? JSON.parse(localStorageItem)
    : showHideColumns;
  const [showHideColumnList, setShowHideColumnList] =
    useState<{ [key: string]: string | boolean }[]>(localData);

  //Filter state
  const [globalFilterApplied, setGlobalFilterApplied] = useState<boolean>(false);
  const [columnFilterApplied, setColumnFilterApplied] =
    useState<boolean>(false);
  const [storeGlobalFilterPayload, setStoreGlobalFilterPayload] = useState<any>(
    []
  );
  const [storeFieldFilterPayload, setStoreFieldFilterPayload] = useState<any>(
    []
  );

  const tableRow = useRef(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    fetchData(newPage,true);
    setPage(newPage);
  };

  const fetchData = async (pageN: number = page,changePagination?: boolean) => {
    const pageNumber = changePagination ? pageN : 1
    try {
      const response = await fetchTakeMethods(
        pageNumber,
        rowsPerPage,
        columnName,
        sortDirection
      );
      if (Array.isArray(response.items)) {
        setData(response.items);
      } else {
        setData([]);
      }
      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ rowsPerPage, sortDirection]);

  const identifySortDirection = (value: string) => {
    if (value === "ASC") {
      setSortDirection(false);
    } else if (value === "DESC") {
      setSortDirection(true);
    } else {
      setSortDirection(false);
    }
  };
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
      let apiPayload =
        value !== ""
          ? showingColumnList.map((item: string) => {
              return {
                filterType: "CONTAINS",
                filterColumn: item,
                filterValue: value,
              };
            })
          : [];
      try {
        const response = await searchTakeMethods(
          1,
          rowsPerPage,
          "TakeMethodId",
          false,
          apiPayload,
          columnList,
          signal
        );
        if (Array.isArray(response?.items)) {
          setData(response.items);
        } else {
          setData([]);
        }
        clearFieldFilter('',true)
        setPage(1)
        setGlobalFilterApplied(true);
        setStoreGlobalFilterPayload([...apiPayload]);
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
        showToast(error.response.data,'error',3000)
        clearFieldFilter('',true)
        setGlobalFilterApplied(true);
        setStoreGlobalFilterPayload([...apiPayload]);
        setData([]);
        setLoader(false);
        if (typeof event == "string" && event !== "") {
          setIsMainSearchFilterApply(true);
        }
      }
    }, 300);
    setMainSearchValue(value);
  };

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

  const applyFieldFilter = async () => {
    try {
      const response = await fetchTakeMethods(
        1,
        rowsPerPage,
        columnList[columnName],
        sortDirection,
        fieldFilterPayload.filterPayload,
        columnList
      );
      if (Array.isArray(response.items)) {
        setData(response.items);
      } else {
        setData([]);
      }
      setPage(1)
      resetMainSearchFilter('',true)
      setColumnFilterApplied(true);
      setStoreFieldFilterPayload([...fieldFilterPayload.filterPayload]);
      if (typeof response.totalRecords === "number") {
        setTotalRecord(response.totalRecords);
      } else {
        setTotalRecord(0);
      }

      setAnchorColumnEl(null);
    } catch (e:any) {
      showToast(e.response.data,'error',3000)
      resetMainSearchFilter('',true)
      setData([]);
      setColumnFilterApplied(true);
      setStoreFieldFilterPayload([...fieldFilterPayload.filterPayload]);
    }
  };

  const clearFieldFilter = (e: any, isClear?: boolean) => {
    if (!isClear) {
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
    setColumnFilterApplied(false);
    setStoreFieldFilterPayload([]);
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

    localStorage.setItem("take-method", JSON.stringify(updatedColumns));
    setShowHideColumnList([...updatedColumns]);
    setAnchorEl(null);
  };

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
    localStorage.setItem("take-method", JSON.stringify(updatedColumns));
    setShowHideColumnList([...updatedColumns]);
  };

  const resetMainSearchFilter = (e: any, isClear?: boolean) => {
    if (!isClear) {
      fetchData();
    }
    setMainSearchValue("");
    setIsMainSearchFilterApply(false);
    setGlobalFilterApplied(false);
    setStoreGlobalFilterPayload([]);
  };

  const checkFilterIsApplied = () => {
    if (globalFilterApplied) {
      return true;
    }
    if (columnFilterApplied) {
      return true;
    }
    return false;
  };
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
          Take Method
        </Typography>
        <div className="mb-[20px] md:flex  items-end gap-5 justify-between">
          <Box className="flex justify-start">
            <div className="custom-form-control">
              <FormControl sx={{ m: 1, width: "35ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-search">
                  Search
                </InputLabel>
                <Input
                  id="standard-adornment-search"
                  type="text"
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
                  columnName="TakeMethodId"
                  filterpayload={
                    globalFilterApplied
                      ? storeGlobalFilterPayload
                      : columnFilterApplied
                      ? storeFieldFilterPayload
                      : []
                  }
                  filterApiEndpoint={
                    globalFilterApplied
                      ? searchTakeMethods
                      : columnFilterApplied
                      ? fetchTakeMethods
                      : () => {}
                  }
                  totalRecords={totalRecord}
                  columnList={columnList}
                  fileName="take-method"
                  filterData={data}
                  apiEndpoint="getAlltakeMethodsPdfCsv"
                  isFilterData={checkFilterIsApplied()}
                  showingColumnList={showingColumnList}
                  payloadData={[
                    "takeMethodName",
                    "definitionInRegulation",
                  ]}
                />
              </IconButton>
              <IconButton
                aria-label="Download as CSV File"
                title="Download as CSV"
              >
                <DownloadCSVData
                  columnName="TakeMethodId"
                  filterpayload={
                    globalFilterApplied
                      ? storeGlobalFilterPayload
                      : columnFilterApplied
                      ? storeFieldFilterPayload
                      : []
                  }
                  filterApiEndpoint={
                    globalFilterApplied
                      ? searchTakeMethods
                      : columnFilterApplied
                      ? fetchTakeMethods
                      : () => {}
                  }
                  totalRecords={totalRecord}
                  fileName="species-group"
                  filterData={data}
                  apiEndpoint="getAlltakeMethodsPdfCsv"
                  isFilterData={checkFilterIsApplied()}
                  columnList={columnList}
                />
              </IconButton>
              <IconButton aria-label="Refresh table" title="Refresh table">
                <CachedIcon color="primary" onClick={resetMainSearchFilter} />
              </IconButton>
            </div>
          </Box>
          {checkAllColumnAreHidden() && (
            <Box>
              <Button variant="contained" onClick={showAllColumns}>
                Show All Columns
              </Button>
            </Box>
          )}
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: "#000" }} ref={tableRow}>
                {/* eslint-disable array-callback-return */}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id}>
                    {showCellData("Take Method Name") && (
                      <TableCell component="th" scope="row">
                        {row.takeMethodName}
                      </TableCell>
                    )}
                    {showCellData("Definition In Regulation") && (
                      <TableCell>{row.definitionInRegulation}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    {!checkAllColumnAreHidden()
                      ? "No data available"
                      : "All Columns are Hide"}
                  </TableCell>
                </TableRow>
              )}
              {data.length > 0 && checkAllColumnAreHidden() && (
                <TableRow>
                  <TableCell colSpan={4}>{"All Columns are Hide"}</TableCell>
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
          horizontal={"right"}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => identifySortDirection("ASC")} disableRipple>
            <ArrowUpwardIcon />
            <span>Sort by ASC</span>
          </MenuItem>
          <MenuItem onClick={() => identifySortDirection("DESC")} disableRipple>
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
          tableName="Take Mehtod"
        />
      </>
    </>
  );
}

export default TakeMethodComponent;
