import React, { useState, useRef, useEffect, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SpeciesGroupModal from "../../shared/modals/species-group/speciesGroupModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ClearIcon from "@mui/icons-material/Clear";
import MenuItem from "@mui/material/MenuItem";
import {
  fetchSpeciesGroupById,
  fetchSpeciesGroups,
  searchSpeciesGroups,
} from "../../services/apiServices";
import FieldFilter from "../fieldFilter/Filter.Componenent";
import { StyledMenu } from "../fieldFilter/Common.Styles";
import { DownloadCSVData } from "../downlaodData/csvData";
import DownloadPDFData from "../downlaodData/pdfData";
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
  speciesGroupId: number;
  name: string;
  members: string;
  definitionInRegulations: string;
  tier: number;
  isApplicationGroup: boolean;
}

interface fieldFilterPayload {
  filterPayload: {
    filterType: string;
    filterColumn: string;
    filterValue: string | number;
    id: number;
  }[];
}

const showingColumnList = [
  "Name",
  "Members",
  "Definition In Regulations",
  "Tier",
  "Is Application Group",
];
type ShowingColumnList = { [key: string]: string };

const columnList: ShowingColumnList = {
  Name: "Name",
  Members: "Members",
  "Definition In Regulations": "DefinitionInRegulations",
  Tier: "Tier",
  "Is Application Group": "IsApplicationGroup",
};

const showHideColumns = [
  {
    columnName: "Name",
    checked: true,
  },
  {
    columnName: "Members",
    checked: true,
  },
  {
    columnName: "Definition In Regulations",
    checked: true,
  },
  {
    columnName: "Tier",
    checked: true,
  },
  {
    columnName: "Is Application Group",
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

function SpeciesGroupComponent() {
  const [data, setData] = useState<IApiData[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [isMainSearchFilterApply, setIsMainSearchFilterApply] =
    useState<boolean>(false);
  const [mainSearchValue, setMainSearchValue] = useState<string>("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPage = Math.ceil(totalRecord / rowsPerPage) ?? 0;
  const [sortDirection, setSortDirection] = useState(false);
  const [modalViewData, setModalViewData] = useState<IApiData[]>([]);
  const [columnName, setColumnName] = useState<string>("Name");
  const [filterItem, setFilterItem] = useState<number[]>([0]);
  const [openModal, setOpenModal] = React.useState(false);
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorColumnEl, setAnchorColumnEl] =
    React.useState<null | HTMLElement>(null);
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
  const localStorageItem = localStorage.getItem("species-group");
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, sortDirection]);

  const fetchData = async (pageN: number = page,changePagination?: boolean) => {
    const pageNumber = changePagination ? pageN : 1
    try {
      const response = await fetchSpeciesGroups(
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
      showToast('Error while fetching data.','error',3000)
      setLoader(false);
    } finally {
    }
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    try {
      fetchData(newPage,true)
      setPage(newPage);
    } catch (error) {
      console.error("Error fetching new page of data", error);
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
      let payload: {
        filterType: string;
        filterColumn: string;
        filterValue: string | number;
      }[] = [];

      if (value.length === 1 && !isNaN(+value)) {
        payload = [
          {
            filterType: "EQUALS",
            filterColumn: "Tier",
            filterValue: value,
          },
        ];
      } else if (value === "true" || value === "false") {
        payload = [
          {
            filterType: "EQUALS",
            filterColumn: "Is Application Group",
            filterValue: value,
          },
        ];
      } else if (value.length > 0) {
        payload = ["Name", "Members", "Definition In Regulations"].map(
          (item: string) => {
            return {
              filterType: "CONTAINS",
              filterColumn: item,
              filterValue: value,
            };
          }
        );
      } else {
        payload = [];
      }

      try {
        const response = await searchSpeciesGroups(
          1,
          rowsPerPage,
          "Name",
          false,
          payload,
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
        setStoreGlobalFilterPayload([...payload]);
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
        setData([]);
        setLoader(false);
        if (typeof event == "string" && event !== "") {
          setIsMainSearchFilterApply(true);
        }
        clearFieldFilter('',true)
        setGlobalFilterApplied(true);
        setStoreGlobalFilterPayload([...payload]);
      }
    }, 300);
    setMainSearchValue(value);
  };

  const openModalHandler = async (speciesGroupId: number) => {
    try {
      const response = await fetchSpeciesGroupById(speciesGroupId);

      if (Array.isArray(response)) {
        setModalViewData(response);
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    } finally {
    }
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const columnFilterListHandle = (
    event: React.MouseEvent<HTMLElement>,
    column: string
  ) => {
    setAnchorEl(event.currentTarget);
    setColumnName(column);
  };

  const identifySortDirection = (value: string) => {
    if (value === "ASC") {
      setSortDirection(false);
    } else if (value === "DESC") {
      setSortDirection(true);
    } else {
      setSortDirection(false);
    }
  };

  const columnFilterhandler = () => {
    setAnchorColumnEl(tableRow?.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const columnFilterClose = useCallback(() => {
    setAnchorColumnEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorColumnEl]);

  const applyFieldFilter = async () => {
    try {
      const response = await fetchSpeciesGroups(
        1,
        rowsPerPage,
        columnList[columnName],
        sortDirection,
        fieldFilterPayload.filterPayload,
        columnList
      );
      if (Array.isArray(response?.items)) {
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
        if (colName == item.columnName) {
          return { ...item, checked: !item.checked };
        }
        return item;
      }
    );

    localStorage.setItem("species-group", JSON.stringify(updatedColumns));
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
    localStorage.setItem("species-group", JSON.stringify(updatedColumns));
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
          Species Groups
        </Typography>
        <div className="mb-[20px] md:flex  items-end gap-5  justify-between">
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
                  fileName="species-group"
                  filterData={data}
                  apiEndpoint="getAllspeciesGroupsPdfCsv"
                  isFilterData={checkFilterIsApplied()}
                  showingColumnList={showingColumnList}
                  payloadData={[
                    "name",
                    "members",
                    "definitionInRegulations",
                    "tier",
                    "isApplicationGroup",
                  ]}
                  filterpayload={
                    globalFilterApplied
                      ? storeGlobalFilterPayload
                      : columnFilterApplied
                      ? storeFieldFilterPayload
                      : []
                  }
                  filterApiEndpoint={
                    globalFilterApplied
                      ? searchSpeciesGroups
                      : columnFilterApplied
                      ? fetchSpeciesGroups
                      : () => {}
                  }
                  totalRecords={totalRecord}
                  columnName="Name"
                  columnList={columnList}
                />
              </IconButton>
              <IconButton
                aria-label="Download as CSV File"
                title="Download as CSV"
              >
                <DownloadCSVData
                  fileName="species-group"
                  filterData={data}
                  apiEndpoint="getAllspeciesGroupsPdfCsv"
                  isFilterData={checkFilterIsApplied()}
                  columnList={columnList}
                  filterpayload={
                    globalFilterApplied
                      ? storeGlobalFilterPayload
                      : columnFilterApplied
                      ? storeFieldFilterPayload
                      : []
                  }
                  filterApiEndpoint={
                    globalFilterApplied
                      ? searchSpeciesGroups
                      : columnFilterApplied
                      ? fetchSpeciesGroups
                      : () => {}
                  }
                  totalRecords={totalRecord}
                  columnName="Name"
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
        <TableContainer component={Box}>
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
                {!checkAllColumnAreHidden() && (
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={index}>
                    {showCellData("Name") && <TableCell>{item.name}</TableCell>}
                    {showCellData("Members") && (
                      <TableCell>{item.members}</TableCell>
                    )}
                    {showCellData("Definition In Regulations") && (
                      <TableCell>{item.definitionInRegulations}</TableCell>
                    )}
                    {showCellData("Tier") && <TableCell>{item.tier}</TableCell>}
                    {showCellData("Is Application Group") && (
                      <TableCell>{String(item.isApplicationGroup)}</TableCell>
                    )}
                    {!checkAllColumnAreHidden() && (
                      <TableCell>
                        <IconButton
                          aria-label="View"
                          onClick={() => openModalHandler(item.speciesGroupId)}
                        >
                          <VisibilityIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    {!checkAllColumnAreHidden()
                      ? "No data available"
                      : "All Columns are Hide"}
                  </TableCell>
                </TableRow>
              )}
              {data.length > 0 && checkAllColumnAreHidden() && (
                <TableRow>
                  <TableCell colSpan={6}>{"All Columns are Hide"}</TableCell>
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
        <SpeciesGroupModal
          open={openModal}
          onClose={closeModalHandler}
          apiData={modalViewData}
        />
        <ShowColumnModal
          open={openColumnModal}
          columnList={showHideColumnList}
          onChangeInput={showHideColumn}
          onClose={openManageColumnModal}
          tableName="Species Group"
        />
      </>
    </>
  );
}

export default SpeciesGroupComponent;
