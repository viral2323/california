import React from "react";
import { AppsComponents } from "../../components/apps/Apps.Components";
import { Box } from "@mui/material";
export const Appspages = () => {
  return (
    <div className="py-10 mainMinHeight">
      <Box className='px-[70px]'>
        <AppsComponents />
      </Box>
    </div>
  );
};
