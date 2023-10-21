import React, { useState } from "react";
// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function createData(
  id: number,
  feature: string,
  ruleId: string,
  appGroups: string,
  ruleGroups: string,
  parenthetical: string,
  ruleType: string,
  restriction: string,
  editDate: string
) {
  return {
    id,
    feature,
    ruleId,
    appGroups,
    ruleGroups,
    parenthetical,
    ruleType,
    restriction,
    editDate,
  };
}
const rows = [
  createData(
    1,
    "location 1",
    "203",
    "Abalone, General",
    "Abalone, General",
    "29.15(A)(b)",
    "Fishery Season",
    "Closed",
    "01/08/2023"
  ),
  createData(
    2,
    "location 2",
    "203",
    "Abalone, General",
    "Abalone, General",
    "29.15(A)(b)",
    "Fishery Season",
    "Closed",
    "01/08/2023"
  ),
  createData(
    3,
    "location 3",
    "203",
    "Abalone, General",
    "Abalone, General",
    "29.15(A)(b)",
    "Fishery Season",
    "Closed",
    "01/08/2023"
  ),
  createData(
    4,
    "location 4",
    "203",
    "Abalone, General",
    "Abalone, General",
    "29.15(A)(b)",
    "Fishery Season",
    "Closed",
    "01/08/2023"
  ),
  createData(
    5,
    "location 5",
    "203",
    "Abalone, General",
    "Abalone, General",
    "29.15(A)(b)",
    "Fishery Season",
    "Closed",
    "01/08/2023"
  ),
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
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
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

export const AppsComponents = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [chooseDate, setChooseDate] = React.useState<Dayjs | null>();
  const [buttonDisabed, setButtonDisabled] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = React.useState<string>("Create new Rule");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");
  const [columnValue, setColumnValue] = useState<any>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [gridOpen, setGridOpen] = useState<boolean>(false);
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
    setOpenFilter(true);
    const column = columns?.filter(
      (item) => item?.label?.toLowerCase() === columnName?.toLowerCase()
    );
    setColumnValue(column[0]?.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const columnSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target?.value);
  };
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setGridOpen(true);
  };

  const refreshDataHandler = () => {
    setListOpen(true);
  };
  return (
    <>
      <Typography variant="h2" className="mb-[2.5rem] md:mb-[2.5rem] text-center" sx={{ color: "#FBAD23" }}>
        App Viewer
      </Typography>
      <div className="relative border border-[#dcdcdc] border-solid mb-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6502595.146296284!2d-119.306607!3d37.2691675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1691169128119!5m2!1sen!2sin"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
        {/* <Drawer
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
            <div className="flex justify-center items-center mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ width: "100%" }}
                  components={["DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label="Active Date"
                    value={chooseDate}
                    onChange={(newValue) => {
                      setChooseDate(newValue);
                      setGridOpen(true);
                    }}
                    sx={{ width: "100%", p: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div> */}

        {/* condition */}
        {/* <>
              {listOpen && (
                <>
                  <div>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                        <ListItemButton
                          role={undefined}
                          onClick={() => {}}
                          dense
                        >
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
                </>
              )}
            </> */}
        {/* </Box>
        </Drawer> */}
      </div>
      <div className="flex justify-center items-center mb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Active Date"
              value={chooseDate}
              onChange={(newValue) => {
                setChooseDate(newValue);
                setGridOpen(true);
              }}
              sx={{ p: 1 }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {gridOpen && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow
                  style={{ color: "#000" }}
                >
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Feature</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "feature");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Rule ID</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Rule ID");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">App Group</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "App Group");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Rule Groups</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Rule Groups");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Parenthetical</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Parenthetical");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Rule Type</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Rule Type");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Restriction</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Restriction");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    <div className="flex justify-between gap-1">
                      <span className="flex">Edit Date</span>
                      <span className="flex">
                        <IconButton
                          sx={{
                            p: 0,
                            color: "#ffffff",
                          }}
                          aria-label="Filter"
                          title="Column Filter"
                          onClick={(e) => {
                            columnFilterListHandle(e, "Edit Date");
                          }}
                        >
                          <MoreVertIcon sx={{color: '#000', fontSize: "20px" }} />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.feature}</TableCell>
                    <TableCell>{row.ruleId}</TableCell>
                    <TableCell>{row.appGroups}</TableCell>
                    <TableCell>{row.ruleGroups}</TableCell>
                    <TableCell>{row.parenthetical}</TableCell>
                    <TableCell>{row.ruleType}</TableCell>
                    <TableCell>{row.restriction}</TableCell>
                    <TableCell>{row.editDate}</TableCell>
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
      components={{ previous: PreIcon, next: NextIcon}}
      {...item}
    />)} />
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
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
            <MenuItem onClick={handleClose} disableRipple>
              <ViewColumnIcon />
              <span>manage Columns</span>
            </MenuItem>
          </StyledMenu>
        </>
      )}
    </>
  );
};
