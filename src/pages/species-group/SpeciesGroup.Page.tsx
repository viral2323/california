import React from "react";
import SpeciesGroupComponent from "../../components/species-group/SpeciesGroup.Component";
import { Box } from "@mui/material";
function SpeciesGroupPage() {
  return (
    <>
      <div className="py-10 mainMinHeight">
        <Box className='px-[70px]'>
          <SpeciesGroupComponent />
        </Box>
      </div>
    </>
  );
}

export default SpeciesGroupPage;
