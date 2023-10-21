import React from "react";
import SpeciesComponent from "../../components/species/Species.Component";
import { Box } from "@mui/material";

function SpeciesPage() {
  return (
    <>
      <div className="py-10 mainMinHeight">
        <Box className='px-[70px]'>
          <SpeciesComponent />
        </Box>
      </div>
    </>
  );
}

export default SpeciesPage;
