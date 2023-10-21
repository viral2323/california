import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
const drawerWidth = 360;
const steps = ["Feature", "Select Rule", "Duration", "Summary"];
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

const speciesList = [
  {
    value: 1,
    label: "Bass, Barred Sand",
  },
  {
    value: 2,
    label: "Bass, Giant Sea",
  },
  {
    value: 3,
    label: "Bass, Kelp",
  },
  {
    value: 4,
    label: "Bass, Rock",
  },
  {
    value: 5,
    label: "Bass, Barred Sand",
  },
  {
    value: 6,
    label: "Bass, Giant Sea",
  },
];
const speciesGroupList = [
  {
    value: 1,
    label: "Bass, Barred Sand",
  },
  {
    value: 2,
    label: "Bass, Giant Sea",
  },
  {
    value: 3,
    label: "Bass, Kelp",
  },
  {
    value: 4,
    label: "Bass, Rock",
  },
  {
    value: 5,
    label: "Bass, Barred Sand",
  },
  {
    value: 6,
    label: "Bass, Giant Sea",
  },
];
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Data {
  featureName: string;
  waterType: string;
  tier: number;
}

function createData(
  featureName: string,
  waterType: string,
  tier: number
): Data {
  return {
    featureName,
    waterType,
    tier,
  };
}

const rows = [
  createData("Painted Cave SMCA", "State Marine Protected Area", 4),
  createData("RAMP Zone 6", "State Marine Protected Area 2", 3),
  createData("RAMP Zone 7", "State Marine Protected Area 3", 2),
  createData("RAMP Zone 8", "State Marine Protected Area 4", 1),
  createData("RAMP Zone 9", "State Marine Protected Area 5", 1),
  createData("RAMP Zone 10", "State Marine Protected Area 6", 1),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: "featureName",
    numeric: false,
    disablePadding: true,
    label: "Feature Name",
  },
  {
    id: "waterType",
    numeric: true,
    disablePadding: false,
    label: "Water Type",
  },
  {
    id: "tier",
    numeric: true,
    disablePadding: false,
    label: "Tier",
  },
];
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Features
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
function FeatureStep(props: any) {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("featureName");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.featureName);
      setSelected(newSelected);
      props?.handler(false);
      return;
    } else {
      props?.handler(true);
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <div>
        <div className="relative border border-[#dcdcdc] border-solid">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6502595.146296284!2d-119.306607!3d37.2691675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1691169128119!5m2!1sen!2sin"
            width="100%"
            height="550"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                position: "absolute",
              },
            }}
          >
            <Box sx={{ py: 2 }}>
              <div>
                <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-search">
                    Search
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-search"
                    type="text"
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Search List"
                          onClick={() => {}}
                          onMouseDown={() => {}}
                          edge="start"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Search"
                  />
                </FormControl>
              </div>
              <div>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "a"}
                          onChange={handleChange}
                          value="a"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "b"}
                          onChange={handleChange}
                          value="b"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "c"}
                          onChange={handleChange}
                          value="c"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "d"}
                          onChange={handleChange}
                          value="d"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "e"}
                          onChange={handleChange}
                          value="e"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => {}} dense>
                      <ListItemIcon>
                        <Radio
                          checked={selectedValue === "f"}
                          onChange={handleChange}
                          value="f"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Feature
                            </Typography>
                            {" — lorem ipsum lorem ipsum…"}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </div>
              <div>
                <Stack spacing={2}>
                  <Pagination count={10} color="primary" />
                </Stack>
              </div>
            </Box>
          </Drawer>
        </div>
        <div className="my-5 flex justify-center items-center">
          <Button variant="contained" onClick={() => {}}>
            Get Features
          </Button>
        </div>
      </div>
    </>
  );
}

function CreateRuleStep(props: any) {
  const formControls = props?.formControl;
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  return (
    <>
      <form>
        <Typography variant="h5" component="h2">
          Details
        </Typography>
        <div className="mb-5">
          <div className="flex items-baseline justify-center gap-5  mb-5">
            <div className="flex-1 flex">
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, width: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Regulation Parenthetical
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue={1}
                  onChange={props?.handler}
                  name={"parenthetical"}
                  disabled
                  label="Regulation Parenthetical"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Regulation Parenthetical 1</MenuItem>
                  <MenuItem value={1}>Regulation Parenthetical 2</MenuItem>
                  <MenuItem value={1}>Regulation Parenthetical 3</MenuItem>
                  <MenuItem value={1}>Regulation Parenthetical 4</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex-1 flex">
              <TextField
                id="standard-basic"
                variant="standard"
                value={"Regulation title"}
                disabled
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col  px-[10px]">
            <div className="mb-2 pl-[2px]">Regualtion Verbatim</div>
            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Type in here…"
              className="w-full"
              disabled
              value={"lorem ipsum"}
            />
          </div>
        </div>
        <Typography variant="h5" component="h2">
          Rules
        </Typography>
        <div className="flex mb-4 gap-4">
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Feature Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={1}
                onChange={(event) => {
                  props?.handler(
                    event,
                    "featureName",
                    formControls?.featureName,
                    props?.createRule?.featureName
                  );
                }}
                name={"featureName"}
                label="Feature Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {features?.map((option) => {
                  return (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.ruleType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Rule Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.ruleType}
                onChange={props?.handler}
                name={"ruleType"}
                label="Rule Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>feature 1</MenuItem>
                <MenuItem value={1}>feature 2</MenuItem>
                <MenuItem value={1}>feature 3</MenuItem>
                <MenuItem value={1}>feature 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.limitType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Limit Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.limitType}
                onChange={props?.handler}
                name={"limitType"}
                label="Limit Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>feature 1</MenuItem>
                <MenuItem value={1}>feature 2</MenuItem>
                <MenuItem value={1}>feature 3</MenuItem>
                <MenuItem value={1}>feature 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.restrictionType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Restriction Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.restrictionType}
                onChange={props?.handler}
                name={"restrictionType"}
                label="Restriction Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>feature 1</MenuItem>
                <MenuItem value={1}>feature 2</MenuItem>
                <MenuItem value={1}>feature 3</MenuItem>
                <MenuItem value={1}>feature 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="flex my-4 gap-4">
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.species}
            >
              <Autocomplete
                disablePortal
                id="combo-box-speciesList"
                options={speciesList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Species"
                    variant="standard"
                    error
                    helperText="Required"
                  />
                )}
              />
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.speciesGroup}
            >
              <Autocomplete
                disablePortal
                id="combo-box-speciesGroupList"
                options={speciesGroupList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Species Group"
                    variant="standard"
                    error
                    helperText="Required"
                  />
                )}
              />
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.measurementType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Measurement Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.measurementType}
                onChange={props?.handler}
                name={"measurementType"}
                label="Measurement Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Measurement Type 1</MenuItem>
                <MenuItem value={1}>Measurement Type 2</MenuItem>
                <MenuItem value={1}>Measurement Type 3</MenuItem>
                <MenuItem value={1}>Measurement Type 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.comparativeType}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Comparative Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.comparativeType}
                onChange={props?.handler}
                name={"comparativeType"}
                label="Comparative Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Comparative Type 1</MenuItem>
                <MenuItem value={1}>Comparative Type 2</MenuItem>
                <MenuItem value={1}>Comparative Type 3</MenuItem>
                <MenuItem value={1}>Comparative Type 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="flex my-4 gap-4">
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.measurementUnit}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Measurement Unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props?.createRule?.measurementUnit}
                onChange={props?.handler}
                name={"measurementUnit"}
                label="Measurement Unit"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Measurement Unit 1</MenuItem>
                <MenuItem value={1}>Measurement Unit 2</MenuItem>
                <MenuItem value={1}>Measurement Unit 3</MenuItem>
                <MenuItem value={1}>Measurement Unit 4</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.limit}
            >
              <TextField
                error
                id="standard-error-limit"
                label="Limit"
                helperText="Required"
                variant="standard"
              />
            </FormControl>
          </div>
          <div className="flex-1 flex">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, width: 1 }}
              error={formControls?.limit}
            >
              <TextField
                error
                id="standard-error-exception"
                label="Exception"
                helperText="Required"
                variant="standard"
              />
            </FormControl>
          </div>
        </div>
      </form>
    </>
  );
}

function DurationStep(props: any) {
  const [startDate, setStartDate] = React.useState<Dayjs | null>();
  const [endDate, setEndDate] = React.useState<Dayjs | null>();
  const [time, setTime] = React.useState<Dayjs | null>();
  const [endTime, setEndTime] = React.useState<Dayjs | null>();
  const [all, setAllYear] = React.useState<boolean>(false);
  return (
    <>
      <Box sx={{ mx: "auto" }}>
        <form>
          <FormGroup className="flex justify-center items-center flex-row">
            <FormControlLabel
              control={<Switch checked={all} />}
              label="All Year"
              onClick={() => {
                setAllYear(!all);
              }}
            />
          </FormGroup>
          {!all && (
            <>
              <div className="flex gap-5 justify-center items-center ">
                <div>
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
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker", "TimePicker"]}>
                      <TimePicker
                        label="Start Time"
                        value={time}
                        onChange={(newValue) => setTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker", "TimePicker"]}>
                      <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={(newValue) => setEndTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </>
          )}
        </form>
      </Box>
    </>
  );
}

function SummaryStep(props: any) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Container maxWidth="md">
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Select Rules
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex gap-4">
              <div className="w-[30%]">Regulation Parenthetical : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Regulation Title : </div>
              <div className="w-[70%]">title 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Feature Name : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Rule Type : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Limit Type : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Restriction Type : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Species : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Species Group : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Measurement Type : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Comparative Type : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Measurement Unit : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Limit : </div>
              <div className="w-[70%]">Regulation Parenthetical 4</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Regulation Verbatim : </div>
              <div className="w-[70%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                sapiente
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Duration
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex gap-4">
              <div className="w-[30%]">All year : </div>
              <div className="w-[70%]">True</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Start Month : </div>
              <div className="w-[70%]">True</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Start Date : </div>
              <div className="w-[70%]">08-08-2023</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">End Date : </div>
              <div className="w-[70%]">08-08-2023</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30%]">Hours : </div>
              <div className="w-[70%]">01: 40 Mins</div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
function CreateNewRule(props: any) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const [step1, setStep1] = React.useState<boolean>(true);
  const [step2, setStep2] = React.useState<boolean>(true);
  const [step3, setStep3] = React.useState<boolean>(true);
  const [step4, setStep4] = React.useState<boolean>(true);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [formControls, setFormControls] = React.useState({
    featureName: true,
    ruleType: true,
    limitType: true,
    restrictionType: true,
    species: true,
    speciesGroup: true,
    measurementType: true,
    comparativeType: true,
    measurementUnit: true,
    limit: true,
  });

  var createRuleForm = {
    featureName: true,
    ruleType: true,
    limitType: true,
    restrictionType: true,
    species: true,
    speciesGroup: true,
    measurementType: true,
    comparativeType: true,
    measurementUnit: true,
    limit: true,
  };
  const [createRule, setCreateRule] = React.useState({
    featureName: "",
    ruleType: "",
    limitType: "",
    restrictionType: "",
    species: "",
    speciesgroup: "",
    measurementType: "",
    comparativeType: "",
    measurementUnit: "",
    limit: "",
  });

  const createRuleHandler = (
    event: any,
    name: any,
    control: any,
    value: any
  ) => {
    setCreateRule(() => {
      return {
        ...createRule,
        [event?.target?.name]: event?.target?.value,
      };
    });
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [feature, setFeature] = React.useState<boolean>(false);
  const featureHandler = () => {
    setFeature(true);
  };
  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <FeatureStep
            step={step1}
            handler={setStep1}
            feature={feature}
            featureHandler={featureHandler}
          />
        );
      case 1:
        return (
          <CreateRuleStep
            step={step2}
            stepHandler={setStep2}
            createRule={createRule}
            handler={createRuleHandler}
            formControl={formControls}
          />
        );
      case 2:
        return <DurationStep step={step3} handler={setStep3} />;
      case 3:
        return <SummaryStep step={step4} handler={setStep4} />;
      default:
        return null;
    }
  }
  return (
    <>
      <Dialog
        fullScreen
        open={props?.open}
        onClose={props?.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props?.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <div className="flex-1"></div>
            <Button autoFocus color="inherit" onClick={props?.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
          <h1 className="text-4xl my-[40px] md:mb-[100px] font-bold text-center">
            {props?.title}
          </h1>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ pt: 2, pl: 3, pr: 3, minHeight: 500, mt: 3 }}>
                  {getSectionComponent()}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Save" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Container>
      </Dialog>
    </>
  );
}

export default CreateNewRule;
