import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function SpeciesGroupModal(props: any) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {open, onClose, apiData} = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
      >
        <DialogTitle>Species Group</DialogTitle>
        <DialogContent>
          <div style={{ minWidth: "500px" }}>
            <div className="custom-form-control-modal">
              <FormControl
                sx={{ m: 1, minWidth: 200, width: "100%" }}
                variant="standard"
              >
                <TextField
                  id="demo-customized-textbox"
                  variant="standard"
                  label="Name"
                  
                  value={apiData[0]?.name}
                />
              </FormControl>
            </div>
            <div className="custom-form-control-modal">
              <FormControl
                sx={{ m: 1, minWidth: 200, width: "100%" }}
                variant="standard"
              >
                <TextField
                  id="demo-customized-textbox"
                  variant="standard"
                  label="Members"
                  
                  value={apiData[0]?.members}
                />
              </FormControl>
            </div>
            <div className="custom-form-control-modal">
              <FormControl
                sx={{ m: 1, minWidth: 200, width: "100%" }}
                variant="standard"
              >
                <TextField
                  id="demo-customized-textbox"
                  variant="standard"
                  label="Definition In Regulations"
                  
                  value={apiData[0]?.definitionInRegulations
                  }
                />
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SpeciesGroupModal;
