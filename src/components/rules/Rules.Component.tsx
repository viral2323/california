import React, { useState, useRef } from "react";
// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CreateNewRule from "./create-new-rule/CreateNewRule";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const columnsList = [
  "Feature",
  "Regulation",
  "Rule Type",
  "Species Group",
  "Species",
  "Restriction",
  "Edit Date",
];
function createData(
  id: number,
  feature: string,
  regulation: string,
  ruleType: string,
  speciesGroup: string,
  species: string,
  restriction: string,
  editDate: string
) {
  return {
    id,
    feature,
    regulation,
    ruleType,
    speciesGroup,
    species,
    restriction,
    editDate,
  };
}
const rows = [
  createData(
    1,
    "173- Ocean Waters and San Francisco Bay District",
    "27.56",
    "Fishery Season",
    "Federal Groundfish",
    "Lingcod",
    "Open",
    "01/08/2023"
  ),
  createData(
    2,
    "173- Ocean Waters and San Francisco Bay District",
    "28.05",
    "Fishery Season",
    "Federal Groundfish",
    "Lingcod",
    "Closed",
    "01/08/2023"
  ),
  createData(
    3,
    "173- Ocean Waters and San Francisco Bay District",
    "28.06",
    "Bag Limit",
    "Federal Groundfish - RCG Complex",
    "Cabezon",
    "Prohibited",
    "01/08/2023"
  ),
  createData(
    4,
    "173- Ocean Waters and San Francisco Bay District",
    "28.62",
    "Bag Limit",
    "Federal Groundfish - RCG Complex",
    "Scorpionfish, California",
    "Limit",
    "01/08/2023"
  ),
  createData(
    5,
    "250- Ocean Waters not including Humboldt and Elkhorn Slough",
    "29.25",
    "Bag Limit",
    "Federal Groundfish - Shelf Rockfish",
    "Sole, Petrale",
    "Limit",
    "01/08/2023"
  ),
  createData(
    5,
    "250- Ocean Waters not including Humboldt and Elkhorn Slough",
    "29.25",
    "Bag Limit",
    "Federal Groundfish - Slope Rockfish",
    "Flounder, Starry",
    "Limit",
    "01/08/2023"
  ),
];
const fields = [
  { label: "Feature", id: 1 },
  { label: "Rule ID", id: 2 },
  { label: "App Group", id: 3 },
  { label: "Rule Groups", id: 4 },
  { label: "Parenthetical", id: 5 },
  { label: "Rule Type", id: 6 },
  { label: "Restriction", id: 7 },
  { label: "Edit Date", id: 8 },
];

const features = [
  {
    value: "0",
    label: "",
  },
  {
    value: "1",
    label: "Marine",
  },
  {
    value: "2",
    label: "Inland",
  },
  {
    value: "3",
    label: "Layers",
  },
  {
    value: "4",
    label: "Inland Districts",
  },
  {
    value: "5",
    label: "Inland Lakes",
  },
  {
    value: "6",
    label: "Inland Streams",
  },
  {
    value: "7",
    label: "Inland Tribarea",
  },
  {
    value: "8",
    label: "Groundfish Management Area",
  },
  {
    value: "9",
    label: "State Marine Protected Area",
  },
  {
    value: "10",
    label: "Management Area",
  },
  {
    value: "11",
    label: "Ramp Zone",
  },
  {
    value: "12",
    label: "Rockfish Conservation Area",
  },
  {
    value: "13",
    label: "Special Management Area",
  },
  {
    value: "14",
    label: "Federal Marine Protected Area",
  },
];

const filterRules = [
  {
    label: "contains",
    value: 1,
  },
  {
    label: "equals",
    value: 2,
  },
  {
    label: "start with",
    value: 3,
  },
  {
    label: "ends with",
    value: 4,
  },
  {
    label: "is empty",
    value: 5,
  },
  {
    label: "is not empty",
    value: 6,
  },
  {
    label: "is any of",
    value: 7,
  },
];
const columns = [
  { label: "Feature", id: 1 },
  { label: "Rule ID", id: 2 },
  { label: "App Group", id: 3 },
  { label: "Rule Groups", id: 4 },
  { label: "Parenthetical", id: 5 },
  { label: "Rule Type", id: 6 },
  { label: "Restriction", id: 7 },
  { label: "Edit Date", id: 8 },
];
const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: props?.horizontal,
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: props?.horizontal,
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const PreIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pr-[0.4rem]'><KeyboardArrowLeftIcon sx={{fontSize: '26px'}}/><Typography>Previous</Typography></Box>

const NextIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pl-[0.4rem]'><Typography>Next</Typography><KeyboardArrowRightIcon sx={{fontSize: '26px'}}/></Box>

function RulesComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [modalTitle, setModalTitle] = React.useState<string>("Create new Rule");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorColumnEl, setAnchorColumnEl] =
    React.useState<null | HTMLElement>(null);
  const ColumnOpen = Boolean(anchorColumnEl);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnValue, setColumnValue] = useState<any>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const tableRow = useRef(null);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeSwitch = (event: any) => {
    console.log(console.log(event?.target));
  };
  const columnFilterListHandle = (
    event: React.MouseEvent<HTMLElement>,
    column: string
  ) => {
    setAnchorEl(event.currentTarget);
    setColumnName("");
    setColumnName(column);
  };
  const columnFilterhandler = () => {
    setAnchorColumnEl(tableRow?.current);
    const column = columns?.filter(
      (item) => item?.label?.toLowerCase() === columnName?.toLowerCase()
    );
    setColumnValue(column[0]?.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const columnFilterClose = () => {
    setAnchorColumnEl(null);
  };
  const columnSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target?.value);
  };

  return (
    <>
      <Typography variant="h2" className="mb-[2.5rem] md:mb-[2.5rem] text-center" sx={{ color: "#FBAD23" }}>
        Rules
      </Typography>
      <div className="flex mb-5">
        <div className="flex-1 flex items-center gap-4 ">
          {/* <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div> */}
          <div className="custom-auto-complete">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Search grid">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </div>
          <div className="custom-auto-complete">
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-select-currency"
              select
              label="Features"
            >
              {features.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex">
            <Button variant="contained" size="large" endIcon={<ClearIcon />}>
              Clear
            </Button>
          </div>
        </div>
        <div className="flex-1 items-center flex justify-end">
          <IconButton
            aria-label="Download as PDF"
            title="Download as PDF"
            onClick={() => {
              console.log("download as PDF");
            }}
          >
            <PictureAsPdfIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="Download as CSV File"
            title="Download as CSV"
            onClick={() => {
              console.log("download as CSV");
            }}
          >
            <SaveAltIcon color="primary" />
          </IconButton>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => {
              openModalHandler();
              setModalTitle("Create New Rule");
            }}
          >
            Add new
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{color: "#000" }}
              ref={tableRow}
            >
              {columnsList &&
                columnsList?.map((head: string) => {
                  return (
                    <TableCell key={head} style={{ fontWeight: 'bold' }}>
                      <div className="flex justify-between gap-1">
                        <span className="flex">{head}</span>
                        <span className="flex">
                          <IconButton
                            sx={{
                              p: 0,
                              color: "#ffffff",
                            }}
                            aria-label="Filter"
                            title="Column Filter"
                            onClick={(e) => {
                              columnFilterListHandle(e, head);
                            }}
                          >
                            <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                          </IconButton>
                        </span>
                      </div>
                    </TableCell>
                  );
                })}
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.feature}</TableCell>
                <TableCell>{row.regulation}</TableCell>
                <TableCell>{row.ruleType}</TableCell>
                <TableCell>{row.speciesGroup}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.restriction}</TableCell>
                <TableCell>{row.editDate}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => {
                      openModalHandler();
                      setModalTitle("Edit Rule");
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Pagination count={10} shape="rounded" className="float-right my-5" renderItem={(item) => (
    <PaginationItem 
      components={{ previous: PreIcon, next:  NextIcon}}
      {...item}
    />)} />
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
        <MenuItem onClick={handleClose} disableRipple>
          <VisibilityOffIcon />
          <span>Hide Column</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          disableRipple
        >
          <ViewColumnIcon />
          <span>manage Columns</span>
        </MenuItem>
      </StyledMenu>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorColumnEl}
        open={ColumnOpen}
        horizontal={"left"}
        onClose={columnFilterClose}
      >
        <div className="p-2">
          <div className="flex items-center">
            <div className="flex items-center gap-2 mr-2 mt-3">
              <IconButton
                sx={{
                  p: 0,
                }}
                aria-label="Clear column filter"
                title="Clear column filter"
                onClick={() => {
                  setSearchValue("");
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <div>
              <TextField
                id="standard-select-column"
                select
                label="Columns"
                variant="standard"
                className="w-[200px]"
                value={columnValue}
                disabled={true}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setColumnValue(event?.target?.value);
                }}
              >
                {columns.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="standard-select-operator"
                select
                label="Operator"
                defaultValue={1}
                variant="standard"
                className="w-[200px]"
              >
                {filterRules.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Value"
                variant="standard"
                placeholder="Filter Value"
                value={searchValue}
                onChange={columnSearchHandler}
              />
            </div>
          </div>
        </div>
      </StyledMenu>
      <CreateNewRule
        title={modalTitle}
        open={openModal}
        handleClose={closeModalHandler}
      />
    </>
  );
}

export default RulesComponent;
