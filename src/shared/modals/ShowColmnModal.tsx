import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface PropTypes {
  open: boolean,
  onClose: () => void,
  onChangeInput: (colName: string) => void,
  columnList:  { [key: string]: string | boolean }[],
  tableName: string
}

function ShowColumnModal(props: PropTypes) {

  const { open, onClose, onChangeInput, columnList, tableName} = props;


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle>{tableName}</DialogTitle>
        <DialogContent>
          <div style={{ minWidth: "500px" }}>
            <div className="custom-form-control-modal">
              <FormGroup>
                {
                    columnList.map((item: any) => {
                        return(
                            <FormControlLabel
                              control={<Checkbox onChange={() => onChangeInput(item.columnName)} checked={item.checked} />}
                              label={item.columnName}
                            />
                        )
                    })
                }
              </FormGroup>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ShowColumnModal;
