import React from "react";
// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
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

const PreIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pr-[0.4rem]'><KeyboardArrowLeftIcon sx={{fontSize: '26px'}}/><Typography>Previous</Typography></Box>

const NextIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pl-[0.4rem]'><Typography>Next</Typography><KeyboardArrowRightIcon sx={{fontSize: '26px'}}/></Box>

function Rulescomponent() {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Typography className="text-4xl  mb-[2.5rem] md:mb-[2.5rem] font-bold text-center" sx={{ color: "#FBAD23" }}>
        Rules Report
      </Typography>
      <div className="flex items-center">
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
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{color: "#000"}}>
              <TableCell style={{ fontWeight: 'bold' }}>Feature</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Rule ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>App Group</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Rule Groups</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Parenthetical</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Rule Type</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Restriction</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Edit Date</TableCell>
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
      components={{ previous: PreIcon, next:  NextIcon}}
      {...item}
    />
  )} />
    </>
  );
}

export default Rulescomponent;
