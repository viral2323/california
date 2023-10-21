import React from "react";
import RulesComponent from "../../components/rules/Rules.Component";
import { Box } from "@mui/material";
function RulesPage() {
  return (
    <>
      <div className="py-10 mainMinHeight">
        <Box className='px-[70px]'>
          <RulesComponent />
        </Box>
      </div>
    </>
  );
}

export default RulesPage;
