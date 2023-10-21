import React from "react";
import TakeMethodComponent from "../../components/take-method/TakeMethod.Component";
import { Box } from "@mui/material";
function TakeMethodPage() {
  return (
    <>
      <div className="py-10 mainMinHeight">
        <Box className='px-[70px]'>
          <TakeMethodComponent />
        </Box>
      </div>
    </>
  );
}

export default TakeMethodPage;
