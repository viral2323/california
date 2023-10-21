import React from "react";
import ReportsComponents from "../../components/reports/Reports.Components";
import { Box } from "@mui/material";
function ReportsPages() {
  return (
    <div className="py-10 mainMinHeight">
      <Box className='px-[70px]'>
        <ReportsComponents />
      </Box>
    </div>
  );
}

export default ReportsPages;
