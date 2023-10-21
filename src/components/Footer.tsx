import React from "react";
import { Container, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import {AppBar, Box} from "@mui/material";

function Footer() {
  return (
    <AppBar component="footer" position="static" sx={{backgroundColor: '#000'}}>
    <Container maxWidth="xl" className="py-3" >
        <Box className='flex flex-row gap-x-3.5'>
          <Typography component='span'>Back to Top</Typography>
          <Typography component='span'>Conditions of Use</Typography>
          <Typography component='span'>Privacy Policy</Typography>
          <Typography component='span'>Accessibility</Typography>
          <Typography component='span'>Contact</Typography>
        </Box>
      </Container>
      <Box color='transparent'  className="py-5" sx={{boxShadow: 'none',backgroundColor: '#f5f5f5'}}>
      <Container maxWidth="xl">
        <div className="flex justify-center md:justify-between items-center flex-wrap">
          <div className="flex justify-center items-center gap-1 flex-wrap">
            
            <Typography  component='span' style={{ color: '#000'}}>State of California.</Typography>
            <CopyrightIcon sx={{ color: "#000" }} fontSize="small" />
            <Typography  component='span' style={{ color: '#000'}}>2023</Typography>
            <a
              style={{color: '#000', fontSize: '1.25rem'}}
              href="#"
              className="flex justify-center items-center gap-1 "
            >
              State Of California
            </a>
          </div>
        </div>
      </Container>
    </Box>
    </AppBar>
    
  );
}

export default Footer;
