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
  source: string,
  code: string,
  title: string,
  parentCode: string,
  text: string,
  details: any[]
) {
  return { id, source, code, title, parentCode, text };
}

const rows = [
  createData(
    1,
    "CCR Title 14",
    "7.50(a)",
    "General Provisions",
    "14CCR 7.59",
    "General Provisions",
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

const PreIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pr-[0.4rem]'><KeyboardArrowLeftIcon sx={{fontSize: '26px'}}/><Typography>Previous</Typography></Box>

const NextIcon = () => <Box className='flex justify-center items-center gap-x-[5px] pl-[0.4rem]'><Typography>Next</Typography><KeyboardArrowRightIcon sx={{fontSize: '26px'}}/></Box>

function Regulationscomponent() {
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
        Regulations Reports
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
              <TableCell style={{ fontWeight: 'bold' }}>Source</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Parent Code</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Text</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.source}
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.parentCode}</TableCell>
                <TableCell>{row.text}</TableCell>
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
    </>
  );
}

export default Regulationscomponent;
