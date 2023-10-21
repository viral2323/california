import React from "react";
import { Outlet } from "react-router-dom";
import RegulationsComponent from "../../components/regulations/Regulations.Component";
import { Box } from "@mui/material";

function RegulationsPage() {
  return (
    <>
      <div className="py-10 mainMinHeight">
        <Box className='px-[70px]'>
          <RegulationsComponent />
          <Outlet />
        </Box>
      </div>
    </>
  );
}

export default RegulationsPage;
